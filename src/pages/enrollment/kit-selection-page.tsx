import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKits } from "@/api/products";
import type { ProductResponse } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { Loader2, Package } from "lucide-react";

export function KitSelectionPage() {
  const [kits, setKits] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getKits()
      .then((data) => {
        const sorted = data.sort(
          (a, b) => Number(a.price_distributor) - Number(b.price_distributor)
        );
        setKits(sorted);
      })
      .catch(() => setError("Error al cargar los kits"))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (kit: ProductResponse) => {
    navigate("/enrollment/form", { state: { kit } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-destructive py-20">{error}</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          Seleccionar Kit de Inicio
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Elige el kit de productos para el nuevo distribuidor
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kits.map((kit) => (
          <button
            key={kit.id}
            onClick={() => handleSelect(kit)}
            className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm transition-all hover:border-primary hover:shadow-md"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                {kit.kit_tier}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {kit.name}
            </h3>

            {kit.description && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {kit.description}
              </p>
            )}

            <div className="mt-4 text-2xl font-bold text-foreground">
              {formatCurrency(kit.price_distributor)}
            </div>

            <div className="mt-3 flex gap-3">
              <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {kit.pv} PV
              </span>
              <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {kit.bv} BV
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
