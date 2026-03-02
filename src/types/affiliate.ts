export interface EnrollmentRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  date_of_birth: string | null;
  country_code: string;
  id_doc_type: string | null;
  id_doc_number: string | null;
  tax_id_type: string | null;
  tax_id_number: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state_province: string | null;
  postal_code: string | null;
  sponsor_id: string | null;
  placement_parent_id: string | null;
  placement_side: "left" | "right" | null;
  kit_tier: "ESP1" | "ESP2" | "ESP3";
  password: string;
}

export interface AffiliateListItem {
  id: string;
  affiliate_code: string;
  full_name: string;
  email: string;
  status: string;
  kit_tier: string | null;
  current_rank: string;
  created_by_username: string | null;
  enrolled_at: string;
}

export interface AffiliateResponse {
  id: string;
  affiliate_code: string;
  country_code: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string | null;
  status: string;
  kit_tier: string | null;
  current_rank: string;
  highest_rank: string;
  sponsor_id: string | null;
  placement_parent_id: string | null;
  placement_side: string | null;
  pv_current_period: string;
  bv_left_total: string;
  bv_right_total: string;
  created_by_user_id: string | null;
  created_by_username: string | null;
  enrolled_at: string;
  created_at: string;
}
