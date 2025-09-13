import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth-api';
import { useAuthStore } from '../stores/auth-store';
import { LoginCredentials, RegisterCredentials, User } from '../types';

// React Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

export function useAuth() {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    setAuth,
    clearAuth,
  };
}

export function useLogin() {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      queryClient.setQueryData(authKeys.user(), data.user);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authApi.register(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      queryClient.setQueryData(authKeys.user(), data.user);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
}

export function useLogout() {
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Clear auth even if logout request fails
      clearAuth();
      queryClient.clear();
    },
  });
}

export function useProfile() {
  const { isAuthenticated } = useAuthStore();
  
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authApi.getProfile(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { setAuth, user, token } = useAuthStore();
  
  return useMutation({
    mutationFn: (userData: Partial<User>) => authApi.updateProfile(userData),
    onSuccess: (updatedUser) => {
      if (token) {
        setAuth(updatedUser, token);
      }
      queryClient.setQueryData(authKeys.profile(), updatedUser);
      queryClient.setQueryData(authKeys.user(), updatedUser);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword({ email }),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, password, confirmPassword }: { 
      token: string; 
      password: string; 
      confirmPassword: string; 
    }) => authApi.resetPassword({ token, password, confirmPassword }),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (passwordData: {
      currentPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }) => authApi.changePassword(passwordData),
  });
}
