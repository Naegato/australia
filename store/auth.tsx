'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { User } from '@/types/user';

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser?: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (token: string | null) => set({ token }),
        user: null,
        setUser: (user: User | null) => set({ user }),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);

export const AuthStoreInitializer = ({
  token,
  user,
}: {
  token: string | null;
  user: User | null;
}) => {
  const setToken = useAuthStore((state) => state.setToken);
  setToken(token);

  const setUser = useAuthStore((state) => state.setUser);
  if (setUser) {
    setUser(user);
  }

  return null;
}