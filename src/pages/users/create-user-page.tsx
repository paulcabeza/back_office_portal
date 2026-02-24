import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, User, CheckCircle } from "lucide-react";
import { createUser, getRoles } from "@/api/users";
import type { RoleResponse } from "@/types/auth";

/** Mirror the backend logic: first initial + primary surname, no accents. */
function previewUsername(firstName: string, lastName: string): string {
  const normalize = (s: string) =>
    s
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z]/g, "");

  const names = firstName.trim().split(/\s+/);
  const surnames = lastName.trim().split(/\s+/);

  const initial = normalize(names[0])?.[0] ?? "";
  const primary = normalize(surnames[0]) ?? "";

  if (!initial || !primary) return "";
  return `${initial}${primary}`;
}

export function CreateUserPage() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");

  // Success state — shows username after creation
  const [createdUsername, setCreatedUsername] = useState("");
  const [createdFullName, setCreatedFullName] = useState("");

  useEffect(() => {
    getRoles().then(setRoles).catch(() => setError("Error al cargar roles"));
  }, []);

  const usernamePreview = useMemo(
    () => previewUsername(firstName, lastName),
    [firstName, lastName]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const newUser = await createUser({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role_ids: selectedRoleId ? [selectedRoleId] : [],
      });
      setCreatedUsername(newUser.username ?? "");
      setCreatedFullName(newUser.full_name);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail ?? "Error al crear usuario";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const assignableRoles = roles.filter(
    (r) => r.name !== "super_admin" && r.name !== "distributor"
  );

  // Success screen
  if (createdUsername) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div className="mb-4 inline-flex rounded-full bg-green-50 p-3">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Usuario Creado</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {createdFullName} ya puede iniciar sesión
        </p>

        <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-sm text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Usuario de acceso</p>
              <p className="text-lg font-bold font-mono text-primary">
                {createdUsername}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            El usuario puede iniciar sesión con este nombre de usuario o con su
            correo electrónico.
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              setCreatedUsername("");
              setCreatedFullName("");
              setEmail("");
              setFirstName("");
              setLastName("");
              setPassword("");
              setSelectedRoleId("");
            }}
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Crear Otro Usuario
          </button>
          <button
            onClick={() => navigate("/users")}
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
          >
            Ver Lista de Usuarios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate("/users")}
        className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Usuarios
      </button>

      <div className="mx-auto max-w-lg">
        <h2 className="text-2xl font-bold text-foreground">Crear Usuario</h2>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Crear una nueva cuenta de usuario para el sistema
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Nombre
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                placeholder="Rosa Ivell"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Apellido
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                placeholder="Cabrera Romero"
              />
            </div>
          </div>

          {/* Username preview */}
          {usernamePreview && (
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Usuario (auto-generado)
              </label>
              <div className="flex items-center gap-2 rounded-md border border-input bg-secondary/50 px-3 py-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm font-semibold text-primary">
                  {usernamePreview}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Se genera automáticamente. Si ya existe, el sistema lo ajustará.
              </p>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Rol
            </label>
            <select
              id="role"
              required
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
            >
              <option value="">Seleccionar rol...</option>
              {assignableRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.display_name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Crear Usuario"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
