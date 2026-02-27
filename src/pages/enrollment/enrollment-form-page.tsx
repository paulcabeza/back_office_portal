import { useState, useEffect, type FormEvent } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { enrollAffiliate, getAffiliates } from "@/api/affiliates";
import type { ProductResponse } from "@/types/product";
import type { AffiliateListItem, EnrollmentRequest } from "@/types/affiliate";
import { formatCurrency } from "@/lib/utils";
import { Loader2, ArrowLeft } from "lucide-react";

export function EnrollmentFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const kit = (location.state as { kit?: ProductResponse })?.kit;

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    id_doc_type: "DUI",
    id_doc_number: "",
    tax_id_type: "",
    tax_id_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state_province: "",
    postal_code: "",
    sponsor_id: "",
    placement_parent_id: "",
    placement_side: "" as "" | "left" | "right",
    password: "",
    password_confirm: "",
  });

  const [affiliates, setAffiliates] = useState<AffiliateListItem[]>([]);
  const [affiliatesLoaded, setAffiliatesLoaded] = useState(false);
  const [affiliatesFetchFailed, setAffiliatesFetchFailed] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Only consider "first distributor" if we successfully loaded and got 0 results
  const isFirstDistributor = affiliatesLoaded && !affiliatesFetchFailed && affiliates.length === 0;

  const loadAffiliates = () => {
    setAffiliatesFetchFailed(false);
    getAffiliates(0, 100)
      .then((data) => {
        setAffiliates(data);
        setAffiliatesLoaded(true);
      })
      .catch(() => {
        setAffiliatesLoaded(true);
        setAffiliatesFetchFailed(true);
      });
  };

  useEffect(() => {
    loadAffiliates();
  }, []);

  if (!kit) {
    return <Navigate to="/enrollment/kits" replace />;
  }

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!form.first_name.trim()) errors.first_name = "Requerido";
    if (!form.last_name.trim()) errors.last_name = "Requerido";
    if (!form.email.trim()) errors.email = "Requerido";
    if (!form.id_doc_number.trim() && !form.tax_id_number.trim()) {
      errors.id_doc_number = "Al menos un documento es requerido";
    }
    if (!form.password) {
      errors.password = "Requerido";
    } else if (form.password.length < 8) {
      errors.password = "Mínimo 8 caracteres";
    }
    if (form.password !== form.password_confirm) {
      errors.password_confirm = "Las contraseñas no coinciden";
    }
    if (!isFirstDistributor) {
      if (!form.sponsor_id) errors.sponsor_id = "Seleccione un patrocinador";
      if (!form.placement_side) errors.placement_side = "Seleccione un lado";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const payload: EnrollmentRequest = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        date_of_birth: form.date_of_birth || null,
        country_code: "SV",
        id_doc_type: form.id_doc_number ? form.id_doc_type : null,
        id_doc_number: form.id_doc_number.trim() || null,
        tax_id_type: form.tax_id_number ? (form.tax_id_type || "NIT") : null,
        tax_id_number: form.tax_id_number.trim() || null,
        address_line1: form.address_line1.trim() || null,
        address_line2: form.address_line2.trim() || null,
        city: form.city.trim() || null,
        state_province: form.state_province.trim() || null,
        postal_code: form.postal_code.trim() || null,
        sponsor_id: isFirstDistributor ? null : (form.sponsor_id || null),
        placement_parent_id: isFirstDistributor ? null : (form.sponsor_id || null),
        placement_side: isFirstDistributor ? null : (form.placement_side || null),
        kit_tier: kit.kit_tier as "ESP1" | "ESP2" | "ESP3",
        password: form.password,
      };

      const result = await enrollAffiliate(payload);
      navigate("/enrollment/confirmation", {
        state: { enrollment: result, kit },
      });
    } catch (err: unknown) {
      const detail = (err as { response?: { data?: { detail?: string } } })
        ?.response?.data?.detail;
      setError(detail ?? "Error al inscribir al distribuidor");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";

  return (
    <div>
      <button
        onClick={() => navigate("/enrollment/kits")}
        className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a kits
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          Inscripción de Distribuidor
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Kit seleccionado:{" "}
          <span className="font-medium text-primary">
            {kit.name} — {formatCurrency(kit.price_distributor)}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Data */}
        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Datos Personales
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="first_name" className={labelClass}>
                Nombres *
              </label>
              <input
                id="first_name"
                required
                value={form.first_name}
                onChange={(e) => updateField("first_name", e.target.value)}
                className={inputClass}
              />
              {fieldErrors.first_name && (
                <p className="mt-1 text-xs text-destructive">
                  {fieldErrors.first_name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="last_name" className={labelClass}>
                Apellidos *
              </label>
              <input
                id="last_name"
                required
                value={form.last_name}
                onChange={(e) => updateField("last_name", e.target.value)}
                className={inputClass}
              />
              {fieldErrors.last_name && (
                <p className="mt-1 text-xs text-destructive">
                  {fieldErrors.last_name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Correo electrónico *
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClass}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-destructive">
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Teléfono
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="date_of_birth" className={labelClass}>
                Fecha de nacimiento
              </label>
              <input
                id="date_of_birth"
                type="date"
                value={form.date_of_birth}
                onChange={(e) => updateField("date_of_birth", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Documents */}
        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Documentos
          </h3>
          <p className="mb-3 text-sm text-muted-foreground">
            Al menos un documento de identidad es requerido
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="id_doc_type" className={labelClass}>
                Tipo de documento
              </label>
              <select
                id="id_doc_type"
                value={form.id_doc_type}
                onChange={(e) => updateField("id_doc_type", e.target.value)}
                className={inputClass}
              >
                <option value="DUI">DUI</option>
                <option value="PASSPORT">Pasaporte</option>
                <option value="RESIDENCE">Carné de residente</option>
              </select>
            </div>
            <div>
              <label htmlFor="id_doc_number" className={labelClass}>
                Número de documento
              </label>
              <input
                id="id_doc_number"
                value={form.id_doc_number}
                onChange={(e) => updateField("id_doc_number", e.target.value)}
                className={inputClass}
              />
              {fieldErrors.id_doc_number && (
                <p className="mt-1 text-xs text-destructive">
                  {fieldErrors.id_doc_number}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="tax_id_type" className={labelClass}>
                Tipo de ID fiscal
              </label>
              <select
                id="tax_id_type"
                value={form.tax_id_type}
                onChange={(e) => updateField("tax_id_type", e.target.value)}
                className={inputClass}
              >
                <option value="">— Ninguno —</option>
                <option value="NIT">NIT</option>
                <option value="NRC">NRC</option>
              </select>
            </div>
            <div>
              <label htmlFor="tax_id_number" className={labelClass}>
                Número fiscal
              </label>
              <input
                id="tax_id_number"
                value={form.tax_id_number}
                onChange={(e) => updateField("tax_id_number", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Address */}
        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Dirección
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="address_line1" className={labelClass}>
                Dirección línea 1
              </label>
              <input
                id="address_line1"
                value={form.address_line1}
                onChange={(e) => updateField("address_line1", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address_line2" className={labelClass}>
                Dirección línea 2
              </label>
              <input
                id="address_line2"
                value={form.address_line2}
                onChange={(e) => updateField("address_line2", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>
                Ciudad
              </label>
              <input
                id="city"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="state_province" className={labelClass}>
                Departamento
              </label>
              <input
                id="state_province"
                value={form.state_province}
                onChange={(e) => updateField("state_province", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="postal_code" className={labelClass}>
                Código postal
              </label>
              <input
                id="postal_code"
                value={form.postal_code}
                onChange={(e) => updateField("postal_code", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* MLM Placement — hidden only when confirmed first distributor */}
        {!isFirstDistributor && (
          <section>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Patrocinador y Ubicación
            </h3>
            {affiliatesFetchFailed && (
              <div className="sm:col-span-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 flex items-center justify-between">
                <p className="text-sm text-destructive">
                  No se pudo cargar la lista de distribuidores.
                </p>
                <button
                  type="button"
                  onClick={loadAffiliates}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Reintentar
                </button>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="sponsor_id" className={labelClass}>
                  Patrocinador *
                </label>
                <select
                  id="sponsor_id"
                  required
                  value={form.sponsor_id}
                  onChange={(e) => updateField("sponsor_id", e.target.value)}
                  className={inputClass}
                  disabled={affiliatesFetchFailed}
                >
                  <option value="">— Seleccione —</option>
                  {affiliates.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.affiliate_code} — {a.full_name}
                    </option>
                  ))}
                </select>
                {fieldErrors.sponsor_id && (
                  <p className="mt-1 text-xs text-destructive">
                    {fieldErrors.sponsor_id}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="placement_side" className={labelClass}>
                  Pierna *
                </label>
                <select
                  id="placement_side"
                  required
                  value={form.placement_side}
                  onChange={(e) =>
                    updateField(
                      "placement_side",
                      e.target.value as "" | "left" | "right"
                    )
                  }
                  className={inputClass}
                  disabled={affiliatesFetchFailed}
                >
                  <option value="">— Seleccione —</option>
                  <option value="left">Izquierdo</option>
                  <option value="right">Derecho</option>
                </select>
                {fieldErrors.placement_side && (
                  <p className="mt-1 text-xs text-destructive">
                    {fieldErrors.placement_side}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Credentials */}
        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Credenciales del Distribuidor
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className={labelClass}>
                Contraseña *
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className={inputClass}
              />
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-destructive">
                  {fieldErrors.password}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password_confirm" className={labelClass}>
                Confirmar contraseña *
              </label>
              <input
                id="password_confirm"
                type="password"
                required
                minLength={8}
                value={form.password_confirm}
                onChange={(e) =>
                  updateField("password_confirm", e.target.value)
                }
                className={inputClass}
              />
              {fieldErrors.password_confirm && (
                <p className="mt-1 text-xs text-destructive">
                  {fieldErrors.password_confirm}
                </p>
              )}
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Inscribir Distribuidor
          </button>
        </div>
      </form>
    </div>
  );
}
