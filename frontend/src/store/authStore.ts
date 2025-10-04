import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthState {
  user: IUser | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const MOCK_USERS = [
  { email: "mehdi@gmail.com", password: "123456", name: "مهدی جیرانی" },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      login: (email, password) => {
        const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          set({
            user: {
              id: Math.random().toString(36).substring(2, 9),
              name: user.name,
              email: user.email,
            },
          });
          return true;
        }
        return false;
      },

      register: (name, email, password) => {
        const exists = MOCK_USERS.some((u) => u.email === email);
        if (exists) return false;

        MOCK_USERS.push({ email, name, password });
        set({
          user: {
            id: Math.random().toString(36).substring(2, 9),
            name,
            email,
          },
        });
        return true;
      },

      logout: () => {
        set({ user: null });
      },

      isAuthenticated: () => get().user !== null,
    }),
    {
      name: "auth-storage",
    }
  )
);
