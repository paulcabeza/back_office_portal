import client from "./client";
import type { LoginRequest, TokenResponse, UserResponse } from "@/types/auth";

export async function login(data: LoginRequest): Promise<TokenResponse> {
  const response = await client.post<TokenResponse>("/auth/login", data);
  return response.data;
}

export async function getMe(): Promise<UserResponse> {
  const response = await client.get<UserResponse>("/auth/me");
  return response.data;
}
