import type { ProductResponse } from "./product";
import type { AffiliateResponse } from "./affiliate";

export interface OrderItemResponse {
  id: string;
  product: ProductResponse;
  quantity: number;
  unit_price: string;
  pv: string;
  bv: string;
  line_total: string;
  line_pv: string;
  line_bv: string;
}

export interface OrderResponse {
  id: string;
  order_number: string;
  affiliate_id: string;
  order_type: string;
  status: string;
  subtotal: string;
  tax_amount: string;
  total: string;
  total_pv: string;
  total_bv: string;
  payment_method: string | null;
  paid_at: string | null;
  items: OrderItemResponse[];
  created_at: string;
}

export interface OrderListItem {
  id: string;
  order_number: string;
  affiliate_id: string;
  affiliate_name: string;
  affiliate_code: string;
  order_type: string;
  status: string;
  total: string;
  total_pv: string;
  total_bv: string;
  payment_method: string | null;
  paid_at: string | null;
  created_at: string;
}

export interface ConfirmPaymentRequest {
  payment_method: string;
  payment_reference?: string;
}

export interface EnrollmentResponse {
  affiliate: AffiliateResponse;
  order: OrderResponse;
}
