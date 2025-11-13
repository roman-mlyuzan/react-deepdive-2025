import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "../types/authState";
import type { User } from "../types/user";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      login: (email: string, password: string) => {
        const fakeUser: User = {
          id: 1,
          email: email,
          name: email.split("@")[0],
        };
        set({ user: fakeUser });
      },

      logout: () => {
        set({ user: null });
      },

      isAuthenticated: () => {
        return get().user !== null;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
