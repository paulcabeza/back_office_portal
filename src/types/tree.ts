export interface TreeNodeResponse {
  id: string;
  affiliate_code: string;
  full_name: string;
  status: string;
  current_rank: string;
  pv_current_period: string;
  bv_left_total: string;
  bv_right_total: string;
  enrolled_at: string;
  left_child: TreeNodeResponse | null;
  right_child: TreeNodeResponse | null;
}
