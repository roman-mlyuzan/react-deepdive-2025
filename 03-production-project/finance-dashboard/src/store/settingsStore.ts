import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Currency } from "../types/currency";

interface UserSettings {
  // User profile
  name: string;
  email: string;

  // Preferences
  currency: Currency;
  theme: "light" | "dark";

  // Actions
  updateProfile: (name: string, email: string) => void;
  updateCurrency: (currency: UserSettings["currency"]) => void;
  toggleTheme: () => void;
  resetSettings: () => void;
}

const defaultSettings = {
  name: "John Doe",
  email: "john@example.com",
  currency: "USD" as const,
  theme: "light" as const,
};

export const useSettingsStore = create<UserSettings>()(
  persist(
    (set) => ({
      ...defaultSettings,

      updateProfile: (name, email) => set(() => ({ name, email })),

      updateCurrency: (currency) => set(() => ({ currency })),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      resetSettings: () => set(() => ({ ...defaultSettings })),
    }),
    {
      name: "user-settings",
    }
  )
);
