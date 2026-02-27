import { create } from "zustand";
import type { UserResponse } from "@/types/auth";
import * as authApi from "@/api/auth";

interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mustChangePassword: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => Promise<void>;
  clearMustChangePassword: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  mustChangePassword: false,

  login: async (email, password) => {
    const tokens = await authApi.login({ email, password });
    localStorage.setItem(
      "auth-tokens",
      JSON.stringify({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      })
    );
    const user = await authApi.getMe();
    set({
      user,
      isAuthenticated: true,
      mustChangePassword: tokens.must_change_password,
    });
  },

  logout: () => {
    localStorage.removeItem("auth-tokens");
    set({ user: null, isAuthenticated: false, mustChangePassword: false });
  },

  initialize: async () => {
    const tokens = localStorage.getItem("auth-tokens");
    if (!tokens) {
      set({ isLoading: false });
      return;
    }
    try {
      const user = await authApi.getMe();
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        mustChangePassword: user.must_change_password,
      });
    } catch {
      localStorage.removeItem("auth-tokens");
      set({ isLoading: false });
    }
  },

  clearMustChangePassword: () => {
    set({ mustChangePassword: false });
  },
}));
