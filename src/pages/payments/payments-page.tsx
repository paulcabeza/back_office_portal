import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Check, X } from "lucide-react";
import { getOrders, confirmPayment } from "@/api/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { OrderListItem } from "@/types/order";

const ORDER_TYPE_LABELS: Record<string, string> = {
  enrollment: "Inscripcion",
  repurchase: "Recompra",
  autoship: "Autoship",
  admin: "Admin",
};

const PAYMENT_METHODS = [
  { value: "cash", label: "Efectivo" },
  { value: "bank_transfer", label: "Transferencia bancaria" },
  { value: "bank_deposit", label: "Deposito bancario" },
  { value: "card", label: "Tarjeta" },
  { value: "other", label: "Otro" },
];

export function PaymentsPage() {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Confirm dialog state
  const [confirmingOrder, setConfirmingOrder] = useState<OrderListItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentReference, setPaymentReference] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmError, setConfirmError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders("pending_payment");
      setOrders(data);
    } catch {
      setError("Error al cargar ordenes pendientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openConfirm = (order: OrderListItem) => {
    setConfirmingOrder(order);
    setPaymentMethod("cash");
    setPaymentReference("");
    setConfirmError("");
  };

  const closeConfirm = () => {
    setConfirmingOrder(null);
    setConfirmError("");
  };

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirmingOrder) return;
    setSaving(true);
    setConfirmError("");

    try {
      await confirmPayment(confirmingOrder.id, {
        payment_method: paymentMethod,
        payment_reference: paymentReference || undefined,
      });
      closeConfirm();
      await fetchOrders();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail ?? "Error al confirmar pago";
      setConfirmError(msg);
    } finally {
      setSaving(false);
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Confirmar Pagos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ordenes pendientes de confirmacion de pago
        </p>
      </div>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      {/* Confirm dialog */}
      {confirmingOrder && (
        <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Confirmar pago — Orden {confirmingOrder.order_number}
            </h3>
            <button
              onClick={closeConfirm}
              className="rounded-md p-1 text-muted-foreground hover:bg-accent transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-4 grid gap-2 text-sm sm:grid-cols-3">
            <div>
              <span className="text-muted-foreground">Distribuidor: </span>
              <span className="font-medium text-foreground">
                {confirmingOrder.affiliate_name}
              </span>
              <span className="ml-1 font-mono text-xs text-primary">
                {confirmingOrder.affiliate_code}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Tipo: </span>
              <span className="font-medium text-foreground">
                {ORDER_TYPE_LABELS[confirmingOrder.order_type] ?? confirmingOrder.order_type}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Total: </span>
              <span className="font-semibold text-foreground">
                {formatCurrency(confirmingOrder.total)}
              </span>
            </div>
          </div>
          <form onSubmit={handleConfirm} className="flex flex-wrap items-end gap-3">
            <div>
              <label
                htmlFor="paymentMethod"
                className="mb-1 block text-xs font-medium text-muted-foreground"
              >
                Metodo de pago
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="paymentReference"
                className="mb-1 block text-xs font-medium text-muted-foreground"
              >
                Referencia (opcional)
              </label>
              <input
                id="paymentReference"
                type="text"
                placeholder="Num. comprobante, recibo, etc."
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Confirmar Pago
            </button>
          </form>
          {confirmError && (
            <p className="mt-2 text-sm text-destructive">{confirmError}</p>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Orden
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Distribuidor
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Tipo
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Total
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                PV
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                BV
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Fecha
              </th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                Accion
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className={`border-b border-border last:border-0 transition-colors ${
                  confirmingOrder?.id === order.id
                    ? "bg-primary/5"
                    : "hover:bg-secondary/30"
                }`}
              >
                <td className="px-4 py-3 font-mono text-sm text-primary">
                  {order.order_number}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">
                    {order.affiliate_name}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {order.affiliate_code}
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground">
                  {ORDER_TYPE_LABELS[order.order_type] ?? order.order_type}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-foreground">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">
                  {order.total_pv}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">
                  {order.total_bv}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => openConfirm(order)}
                    disabled={confirmingOrder !== null}
                    className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Confirmar
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No hay ordenes pendientes de pago
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
