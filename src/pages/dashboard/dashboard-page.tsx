import { useNavigate } from "react-router-dom";
import { UserPlus, Package, CreditCard, GitBranch, Users, UsersRound } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

interface MenuItem {
  label: string;
  description: string;
  icon: typeof UserPlus;
  path: string;
  disabled?: boolean;
  superadminOnly?: boolean;
}

const menuItems: MenuItem[] = [
  {
    label: "Inscribir Nuevo Distribuidor",
    description: "Registrar un nuevo distribuidor con su kit de inicio",
    icon: UserPlus,
    path: "/enrollment/kits",
  },
  {
    label: "Distribuidores",
    description: "Ver la lista de distribuidores inscritos en la red",
    icon: UsersRound,
    path: "/distributors",
  },
  {
    label: "Gestión de Administradores",
    description: "Crear y administrar cuentas administrativas",
    icon: Users,
    path: "/users",
    superadminOnly: true,
  },
  {
    label: "Catálogo de Productos",
    description: "Ver kits y productos disponibles",
    icon: Package,
    path: "/enrollment/kits",
    disabled: true,
  },
  {
    label: "Confirmar Pagos",
    description: "Confirmar pagos de órdenes pendientes",
    icon: CreditCard,
    path: "/",
    disabled: true,
  },
  {
    label: "Árbol de Red",
    description: "Visualizar el árbol binario de distribuidores",
    icon: GitBranch,
    path: "/network/tree",
  },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isSuperadmin = user?.is_superadmin ?? false;

  const visibleItems = menuItems.filter(
    (item) => !item.superadminOnly || isSuperadmin
  );

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Panel Principal</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Selecciona una opción para continuar
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {visibleItems.map((item) => (
          <button
            key={item.label}
            onClick={() => !item.disabled && navigate(item.path)}
            disabled={item.disabled}
            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:shadow-sm"
          >
            <div className="rounded-lg bg-primary/10 p-2.5">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary group-disabled:group-hover:text-foreground transition-colors">
                {item.label}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
              {item.disabled && (
                <span className="mt-2 inline-block rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  Próximamente
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
