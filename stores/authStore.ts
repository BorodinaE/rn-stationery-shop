import { create } from 'zustand';

interface AuthState {
  token: string | null;

  signIn: (token: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  signIn: (token) => set({ token }),
  signOut: () => set({ token: null }),
}));
