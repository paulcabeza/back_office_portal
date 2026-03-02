import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Loader2, MoreVertical } from "lucide-react";
import { getUsers, updateUser } from "@/api/users";
import { formatDate } from "@/lib/utils";
import type { UserListItem } from "@/types/user";

export function UsersPage() {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      // Show only admin/staff users (exclude distributor-only users)
      const admins = data.filter(
        (u) => !u.roles.every((r) => r.name === "distributor")
      );
      setUsers(admins);
    } catch {
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleActive = async (user: UserListItem) => {
    try {
      await updateUser(user.id, { is_active: !user.is_active });
      await fetchUsers();
    } catch {
      setError("Error al actualizar usuario");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Administradores</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cuentas administrativas del sistema
          </p>
        </div>
        <button
          onClick={() => navigate("/users/new")}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Crear Usuario
        </button>
      </div>

      {error && (
        <p className="mb-4 text-sm text-destructive">{error}</p>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Nombre
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Usuario
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Rol
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Ultimo acceso
              </th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                Estado
              </th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {user.full_name}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-primary">
                  {user.username ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {user.roles.length > 0 ? (
                    <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {user.roles.map((r) => r.display_name).join(", ")}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Sin rol</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {user.last_login_at ? (
                    formatDate(user.last_login_at)
                  ) : (
                    <span className="text-muted-foreground">Nunca</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {user.is_active ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="px-2 py-3 text-center">
                  <div className="relative" ref={openMenuId === user.id ? menuRef : undefined}>
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === user.id ? null : user.id)
                      }
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    {openMenuId === user.id && (
                      <div className="absolute right-0 z-10 mt-1 w-44 rounded-md border border-border bg-card py-1 shadow-lg">
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            navigate(`/users/${user.id}/edit`);
                          }}
                          className="flex w-full items-center px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        >
                          Ver detalle
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            toggleActive(user);
                          }}
                          className="flex w-full items-center px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        >
                          {user.is_active ? "Desactivar usuario" : "Activar usuario"}
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
