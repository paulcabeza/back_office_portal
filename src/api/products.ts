import client from "./client";
import type { ProductResponse } from "@/types/product";

export async function getKits(): Promise<ProductResponse[]> {
  const response = await client.get<ProductResponse[]>("/products", {
    params: { kits_only: true },
  });
  return response.data;
}
