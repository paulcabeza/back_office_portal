import client from "./client";
import type { EnrollmentRequest } from "@/types/affiliate";
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
