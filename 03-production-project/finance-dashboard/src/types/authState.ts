import type { User } from "./user";

export interface AuthState {
  user: User | null;

  login: (email: string, password: string) => void;
  logout: () => void;

  isAuthenticated: () => boolean;
}
