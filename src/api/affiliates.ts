import client from "./client";
import type { AffiliateListItem, AffiliateResponse, EnrollmentRequest } from "@/types/affiliate";
import type { EnrollmentResponse } from "@/types/order";
import type { TreeNodeResponse } from "@/types/tree";

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

export async function getAffiliate(id: string): Promise<AffiliateResponse> {
  const response = await client.get<AffiliateResponse>(`/affiliates/${id}`);
  return response.data;
}

export async function getMyAffiliate(): Promise<AffiliateResponse> {
  const response = await client.get<AffiliateResponse>("/affiliates/me");
  return response.data;
}

export async function deleteAffiliate(id: string): Promise<void> {
  await client.delete(`/affiliates/${id}`);
}

export async function getAffiliateTree(
  affiliateId: string,
  depth = 3
): Promise<TreeNodeResponse> {
  const response = await client.get<TreeNodeResponse>(
    `/affiliates/${affiliateId}/tree`,
    { params: { depth } }
  );
  return response.data;
}
