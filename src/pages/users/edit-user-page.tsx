import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, User } from "lucide-react";
import { getUser, getRoles, updateUser } from "@/api/users";
import type { UserResponse, RoleResponse } from "@/types/auth";

export function EditUserPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [selectedRoleId, setSelectedRoleId] = useState("");

  useEffect(() => {
    if (!userId) return;
    Promise.all([getUser(userId), getRoles()])
      .then(([userData, rolesData]) => {
        setUser(userData);
        setRoles(rolesData);
        setEmail(userData.email);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setIsActive(userData.is_active);
        setSelectedRoleId(userData.roles[0]?.id ?? "");
      })
      .catch(() => setError("Error al cargar datos del usuario"))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setError("");
    setSaving(true);

    try {
      await updateUser(userId, {
        email,
        first_name: firstName,
        last_name: lastName,
        is_active: isActive,
        role_id: selectedRoleId || undefined,
      });
      navigate("/users");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail ?? "Error al actualizar usuario";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const assignableRoles = roles.filter(
    (r) => r.name !== "super_admin" && r.name !== "distributor"
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Usuario no encontrado
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
        <h2 className="text-2xl font-bold text-foreground">Editar Usuario</h2>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          {user.full_name}
          {user.username && (
            <span className="ml-1 font-mono text-primary">@{user.username}</span>
          )}
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
              />
            </div>
          </div>

          {/* Username — readonly */}
          {user.username && (
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Usuario
              </label>
              <div className="flex items-center gap-2 rounded-md border border-input bg-secondary/50 px-3 py-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm font-semibold text-primary">
                  {user.username}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Generado automáticamente, no se puede modificar.
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
              htmlFor="role"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Rol
            </label>
            <select
              id="role"
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              disabled={user.is_superadmin}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2 disabled:opacity-50"
            >
              <option value="">Seleccionar rol...</option>
              {assignableRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.display_name}
                </option>
              ))}
            </select>
            {user.is_superadmin && (
              <p className="mt-1 text-xs text-muted-foreground">
                El rol de superadmin no se puede modificar
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isActive"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            <label htmlFor="isActive" className="text-sm text-foreground">
              Usuario activo
            </label>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Guardar Cambios"
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
