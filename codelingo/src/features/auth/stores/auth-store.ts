import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import type { User, AuthState } from '../types';
import { setAuthToken, clearAuth as clearAuthTokens } from '../../../lib/api-client';

interface AuthStore extends AuthState {
  // Actions
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (userData: Partial<User>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        setAuth: (user: User, token: string) => {
          setAuthToken(token);
          set({
            user,
            token,
            isAuthenticated: true,
            error: null,
          });
        },

        clearAuth: () => {
          clearAuthTokens();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
          });
        },

        updateUser: (userData: Partial<User>) => {
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, ...userData },
            });
          }
        },

        setLoading: (isLoading: boolean) => {
          set({ isLoading });
        },

        setError: (error: string | null) => {
          set({ error });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
        // Only persist essential auth data
        onRehydrateStorage: () => (state) => {
          // Reset loading and error states on rehydration
          if (state) {
            state.isLoading = false;
            state.error = null;
          }
        },
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

// Selectors for better performance
export const useAuth = () => useAuthStore((state) => state);
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
