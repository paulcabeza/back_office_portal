import { useLocation, Navigate, useNavigate } from "react-router-dom";
import type { EnrollmentResponse } from "@/types/order";
import type { ProductResponse } from "@/types/product";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle, UserPlus } from "lucide-react";

export function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    enrollment?: EnrollmentResponse;
    kit?: ProductResponse;
  } | null;

  if (!state?.enrollment) {
    return <Navigate to="/enrollment/kits" replace />;
  }

  const { affiliate, order } = state.enrollment;
  const kit = state.kit;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Success Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Distribuidor Inscrito
        </h2>
        <p className="mt-2 text-4xl font-bold text-primary">
          {affiliate.affiliate_code}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Código de distribuidor
        </p>
      </div>

      {/* Affiliate Info */}
      <div className="mb-6 rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Datos del Distribuidor
        </h3>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Nombre</dt>
            <dd className="text-sm font-medium text-foreground">
              {affiliate.full_name}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Correo</dt>
            <dd className="text-sm font-medium text-foreground">
              {affiliate.email}
            </dd>
          </div>
          {affiliate.phone && (
            <div>
              <dt className="text-sm text-muted-foreground">Teléfono</dt>
              <dd className="text-sm font-medium text-foreground">
                {affiliate.phone}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-sm text-muted-foreground">Estado</dt>
            <dd className="text-sm font-medium text-foreground capitalize">
              {affiliate.status}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Rango</dt>
            <dd className="text-sm font-medium text-foreground capitalize">
              {affiliate.current_rank}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">
              Fecha de inscripción
            </dt>
            <dd className="text-sm font-medium text-foreground">
              {formatDate(affiliate.enrolled_at)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Order Summary */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Resumen de Orden
        </h3>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Número de orden</dt>
            <dd className="text-sm font-medium text-foreground">
              {order.order_number}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Kit</dt>
            <dd className="text-sm font-medium text-foreground">
              {kit?.name ?? order.items[0]?.product.name ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Total</dt>
            <dd className="text-sm font-bold text-foreground">
              {formatCurrency(order.total)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Estado</dt>
            <dd className="text-sm font-medium text-foreground capitalize">
              {order.status.replace(/_/g, " ")}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">PV Total</dt>
            <dd className="text-sm font-medium text-primary">
              {order.total_pv}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">BV Total</dt>
            <dd className="text-sm font-medium text-primary">
              {order.total_bv}
            </dd>
          </div>
        </dl>
      </div>

      {/* Actions */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/enrollment/kits")}
          className="flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          Inscribir Otro Distribuidor
        </button>
      </div>
    </div>
  );
}
