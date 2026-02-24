import type { UserResponse, RoleResponse } from "./auth";

export interface CreateUserRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role_ids: string[];
}

export interface UpdateUserRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  role_id?: string;
}

export interface UserListItem {
  id: string;
  username: string | null;
  email: string;
  full_name: string;
  is_active: boolean;
  roles: RoleResponse[];
  created_at: string;
}

export type { UserResponse };
