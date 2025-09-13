import { apiClient } from '../../../lib/api-client';
import { apiEndpoints } from '../../../config/api-endpoints';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  User,
} from '../types';

export const authApi = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      apiEndpoints.auth.login,
      credentials
    );
    return response.data;
  },

  // Register new user
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      apiEndpoints.auth.register,
      credentials
    );
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiClient.post(apiEndpoints.auth.logout);
  },

  // Refresh authentication token
  refreshToken: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      apiEndpoints.auth.refresh
    );
    return response.data;
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>(apiEndpoints.auth.profile);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(
      apiEndpoints.user.updateProfile,
      userData
    );
    return response.data;
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      apiEndpoints.auth.forgotPassword,
      data
    );
    return response.data;
  },

  // Reset password
  resetPassword: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      apiEndpoints.auth.resetPassword,
      data
    );
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.put<{ message: string }>(
      apiEndpoints.user.changePassword,
      data
    );
    return response.data;
  },

  // Verify email
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      `${apiEndpoints.auth.verifyEmail}?token=${token}`
    );
    return response.data;
  },

  // Resend verification email
  resendVerificationEmail: async (): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      apiEndpoints.auth.verifyEmail
    );
    return response.data;
  },
};
