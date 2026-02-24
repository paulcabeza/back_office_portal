import { useEffect, useState } from "react";
import { Loader2, Award, TrendingUp, GitBranch, Hash, Package } from "lucide-react";
import { getMyAffiliate } from "@/api/affiliates";
import type { AffiliateResponse } from "@/types/affiliate";
import { useAuthStore } from "@/stores/auth-store";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  active: { label: "Activo", className: "bg-green-50 text-green-700" },
  pending: { label: "Pendiente", className: "bg-yellow-50 text-yellow-700" },
  inactive: { label: "Inactivo", className: "bg-red-50 text-red-700" },
  suspended: { label: "Suspendido", className: "bg-red-50 text-red-700" },
};

export function DistributorDashboard() {
  const user = useAuthStore((s) => s.user);
  const [affiliate, setAffiliate] = useState<AffiliateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyAffiliate()
      .then(setAffiliate)
      .catch(() => setError("No se pudo cargar tu perfil de distribuidor"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !affiliate) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">{error || "Perfil no encontrado"}</p>
      </div>
    );
  }

  const statusInfo = STATUS_LABELS[affiliate.status] ?? {
    label: affiliate.status,
    className: "bg-secondary text-muted-foreground",
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          Bienvenido, {user?.first_name ?? affiliate.first_name}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tu resumen como distribuidor Ganoherb
        </p>
      </div>

      {/* Code + Status */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2">
          <Hash className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">
            {affiliate.affiliate_code}
          </span>
        </div>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusInfo.className}`}
        >
          {statusInfo.label}
        </span>
        {affiliate.kit_tier && (
          <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
            <Package className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {affiliate.kit_tier}
            </span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={TrendingUp}
          label="PV Periodo Actual"
          value={Number(affiliate.pv_current_period).toLocaleString("es-SV")}
        />
        <StatCard
          icon={GitBranch}
          label="BV Pierna Izquierda"
          value={Number(affiliate.bv_left_total).toLocaleString("es-SV")}
        />
        <StatCard
          icon={GitBranch}
          label="BV Pierna Derecha"
          value={Number(affiliate.bv_right_total).toLocaleString("es-SV")}
        />
        <StatCard
          icon={Award}
          label="Rango Actual"
          value={affiliate.current_rank}
        />
      </div>

      {/* Info */}
      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Información Personal
        </h3>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <InfoRow label="Nombre completo" value={affiliate.full_name} />
          <InfoRow label="Email" value={affiliate.email} />
          <InfoRow label="Teléfono" value={affiliate.phone ?? "—"} />
          <InfoRow label="País" value={affiliate.country_code} />
          <InfoRow
            label="Fecha de inscripción"
            value={new Date(affiliate.enrolled_at).toLocaleDateString("es-SV")}
          />
          <InfoRow label="Rango más alto" value={affiliate.highest_rank} />
        </dl>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
