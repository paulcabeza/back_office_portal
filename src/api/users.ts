import client from "./client";
import type { UserResponse, RoleResponse } from "@/types/auth";
import type { CreateUserRequest, UpdateUserRequest, UserListItem } from "@/types/user";

export async function getUsers(skip = 0, limit = 50): Promise<UserListItem[]> {
  const response = await client.get<UserListItem[]>("/users", {
    params: { skip, limit },
  });
  return response.data;
}

export async function getUser(id: string): Promise<UserResponse> {
  const response = await client.get<UserResponse>(`/users/${id}`);
  return response.data;
}

export async function createUser(data: CreateUserRequest): Promise<UserResponse> {
  const response = await client.post<UserResponse>("/users", data);
  return response.data;
}

export async function updateUser(id: string, data: UpdateUserRequest): Promise<UserResponse> {
  const response = await client.patch<UserResponse>(`/users/${id}`, data);
  return response.data;
}

export async function getRoles(): Promise<RoleResponse[]> {
  const response = await client.get<RoleResponse[]>("/users/roles");
  return response.data;
}
