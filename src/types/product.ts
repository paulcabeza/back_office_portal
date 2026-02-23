export interface ProductResponse {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  category: string;
  price_public: string;
  price_distributor: string;
  currency: string;
  pv: string;
  bv: string;
  is_kit: boolean;
  kit_tier: string | null;
  status: string;
}
