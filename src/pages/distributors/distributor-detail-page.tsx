import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, GitBranch } from "lucide-react";
import { getAffiliate } from "@/api/affiliates";
import { formatDate } from "@/lib/utils";
import type { AffiliateResponse } from "@/types/affiliate";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: "Activo", color: "bg-green-50 text-green-700" },
  pending: { label: "Pendiente", color: "bg-yellow-50 text-yellow-700" },
  inactive: { label: "Inactivo", color: "bg-red-50 text-red-700" },
  suspended: { label: "Suspendido", color: "bg-orange-50 text-orange-700" },
  cancelled: { label: "Cancelado", color: "bg-gray-100 text-gray-600" },
};

const RANK_LABELS: Record<string, string> = {
  affiliate: "Afiliado",
  bronze: "Bronce",
  silver: "Plata",
  gold: "Oro",
  platinum: "Platino",
  diamond: "Diamante",
  double_diamond: "Doble Diamante",
  crown: "Corona",
  royal_crown: "Corona Real",
  ambassador: "Embajador",
};

export function DistributorDetailPage() {
  const { affiliateId } = useParams<{ affiliateId: string }>();
  const navigate = useNavigate();
  const [affiliate, setAffiliate] = useState<AffiliateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!affiliateId) return;
    getAffiliate(affiliateId)
      .then(setAffiliate)
      .catch(() => setError("Error al cargar datos del distribuidor"))
      .finally(() => setLoading(false));
  }, [affiliateId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !affiliate) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        {error || "Distribuidor no encontrado"}
      </div>
    );
  }

  const st = STATUS_LABELS[affiliate.status] ?? {
    label: affiliate.status,
    color: "bg-gray-100 text-gray-600",
  };

  return (
    <div>
      <button
        onClick={() => navigate("/distributors")}
        className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Distribuidores
      </button>

      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {affiliate.full_name}
            </h2>
            <p className="mt-1 font-mono text-sm text-primary">
              {affiliate.affiliate_code}
            </p>
          </div>
          <button
            onClick={() => navigate(`/network/tree/${affiliate.id}`)}
            className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
          >
            <GitBranch className="h-4 w-4" />
            Ver arbol
          </button>
        </div>

        <div className="space-y-6">
          {/* Info general */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Informacion General
            </h3>
            <dl className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre" value={affiliate.full_name} />
              <Field label="Correo" value={affiliate.email} />
              <Field label="Telefono" value={affiliate.phone ?? "—"} />
              <Field label="Pais" value={affiliate.country_code} />
              <Field
                label="Estado"
                value={
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}
                  >
                    {st.label}
                  </span>
                }
              />
              <Field label="Kit" value={affiliate.kit_tier ?? "—"} />
              <Field
                label="Rango actual"
                value={RANK_LABELS[affiliate.current_rank] ?? affiliate.current_rank}
              />
              <Field
                label="Rango mas alto"
                value={RANK_LABELS[affiliate.highest_rank] ?? affiliate.highest_rank}
              />
            </dl>
          </div>

          {/* Inscripcion */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Inscripcion
            </h3>
            <dl className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Fecha de inscripcion"
                value={formatDate(affiliate.enrolled_at)}
              />
              <Field
                label="Inscrito por"
                value={affiliate.created_by_username ?? "—"}
                highlight
              />
            </dl>
          </div>

          {/* Volumenes */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Volumenes
            </h3>
            <dl className="grid gap-4 sm:grid-cols-3">
              <Field label="PV periodo actual" value={affiliate.pv_current_period} />
              <Field label="BV izquierda" value={affiliate.bv_left_total} />
              <Field label="BV derecha" value={affiliate.bv_right_total} />
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  highlight,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd
        className={`mt-1 text-sm ${highlight ? "font-semibold text-primary" : "text-foreground"}`}
      >
        {value}
      </dd>
    </div>
  );
}
