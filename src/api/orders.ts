import client from "./client";
import type { ConfirmPaymentRequest, OrderListItem, OrderResponse } from "@/types/order";

export async function getOrders(status = "pending_payment"): Promise<OrderListItem[]> {
  const response = await client.get<OrderListItem[]>("/orders", {
    params: { status },
  });
  return response.data;
}

export async function confirmPayment(
  orderId: string,
  data: ConfirmPaymentRequest
): Promise<OrderResponse> {
  const response = await client.patch<OrderResponse>(
    `/orders/${orderId}/confirm-payment`,
    data
  );
  return response.data;
}
