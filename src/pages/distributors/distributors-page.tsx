import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Loader2 } from "lucide-react";
import { getAffiliates } from "@/api/affiliates";
import { formatDate } from "@/lib/utils";
import type { AffiliateListItem } from "@/types/affiliate";

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

export function DistributorsPage() {
  const [affiliates, setAffiliates] = useState<AffiliateListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAffiliates = async () => {
      setLoading(true);
      try {
        const data = await getAffiliates();
        setAffiliates(data);
      } catch {
        setError("Error al cargar distribuidores");
      } finally {
        setLoading(false);
      }
    };
    fetchAffiliates();
  }, []);

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
          <h2 className="text-2xl font-bold text-foreground">Distribuidores</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Red de distribuidores inscritos en el sistema
          </p>
        </div>
        <button
          onClick={() => navigate("/enrollment/kits")}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          Inscribir
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
                Codigo
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Nombre
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Kit
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Rango
              </th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                Estado
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Inscripcion
              </th>
            </tr>
          </thead>
          <tbody>
            {affiliates.map((a) => {
              const st = STATUS_LABELS[a.status] ?? {
                label: a.status,
                color: "bg-gray-100 text-gray-600",
              };
              return (
                <tr
                  key={a.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-sm text-primary">
                    {a.affiliate_code}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {a.full_name}
                  </td>
                  <td className="px-4 py-3">
                    {a.kit_tier ? (
                      <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {a.kit_tier}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {RANK_LABELS[a.current_rank] ?? a.current_rank}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}
                    >
                      {st.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {formatDate(a.enrolled_at)}
                  </td>
                </tr>
              );
            })}
            {affiliates.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No hay distribuidores registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
