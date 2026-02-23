import { create } from "zustand";
import type { UserResponse } from "@/types/auth";
import * as authApi from "@/api/auth";

interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

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
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("auth-tokens");
    set({ user: null, isAuthenticated: false });
  },

  initialize: async () => {
    const tokens = localStorage.getItem("auth-tokens");
    if (!tokens) {
      set({ isLoading: false });
      return;
    }
    try {
      const user = await authApi.getMe();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem("auth-tokens");
      set({ isLoading: false });
    }
  },
}));
