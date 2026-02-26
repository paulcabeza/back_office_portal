import client from "./client";
import type { AffiliateListItem, AffiliateResponse, EnrollmentRequest } from "@/types/affiliate";
import type { EnrollmentResponse } from "@/types/order";

export async function enrollAffiliate(
  data: EnrollmentRequest
): Promise<EnrollmentResponse> {
  const response = await client.post<EnrollmentResponse>(
    "/affiliates/enroll",
    data
  );
  return response.data;
}

export async function getAffiliates(
  skip = 0,
  limit = 50,
  status?: string
): Promise<AffiliateListItem[]> {
  const response = await client.get<AffiliateListItem[]>("/affiliates", {
    params: { skip, limit, ...(status ? { status } : {}) },
  });
  return response.data;
}

export async function getMyAffiliate(): Promise<AffiliateResponse> {
  const response = await client.get<AffiliateResponse>("/affiliates/me");
  return response.data;
}
