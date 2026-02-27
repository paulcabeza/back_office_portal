export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  must_change_password: boolean;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface RoleResponse {
  id: string;
  name: string;
  display_name: string;
}

export interface UserResponse {
  id: string;
  username: string | null;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  is_active: boolean;
  is_superadmin: boolean;
  must_change_password: boolean;
  roles: RoleResponse[];
  created_at: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}
