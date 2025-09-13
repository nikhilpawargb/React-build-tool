import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '../config/env';

// Types for API client
interface ApiClientConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

interface ApiError {
  message: string;
  status: number;
  data?: any;
}

// Create axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: env.API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Add auth token if available and not skipped
      const shouldSkipAuth = (config as ApiClientConfig).skipAuth;
      if (!shouldSkipAuth) {
        const token = getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // Add request timestamp for debugging
      if (env.DEV) {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
          headers: config.headers,
          data: config.data,
        });
      }

      return config;
    },
    (error) => {
      if (env.DEV) {
        console.error('[API Request Error]', error);
      }
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (env.DEV) {
        console.log(`[API Response] ${response.status}`, response.data);
      }
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (env.DEV) {
        console.error('[API Response Error]', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh token
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            const response = await client.post('/auth/refresh', {
              refreshToken,
            });

            const { token } = response.data;
            setAuthToken(token);

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return client(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, redirect to login
          clearAuth();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }

      // Handle other error statuses
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status || 500,
        data: error.response?.data,
      };

      return Promise.reject(apiError);
    }
  );

  return client;
};

// Create the API client instance
export const apiClient = createApiClient();

// Token management utilities
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
}

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refresh_token');
}

function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  sessionStorage.removeItem('auth_token');
}

// Utility functions for different HTTP methods
export const api = {
  get: <T>(url: string, config?: ApiClientConfig): Promise<AxiosResponse<T>> =>
    apiClient.get(url, config),

  post: <T>(url: string, data?: any, config?: ApiClientConfig): Promise<AxiosResponse<T>> =>
    apiClient.post(url, data, config),

  put: <T>(url: string, data?: any, config?: ApiClientConfig): Promise<AxiosResponse<T>> =>
    apiClient.put(url, data, config),

  patch: <T>(url: string, data?: any, config?: ApiClientConfig): Promise<AxiosResponse<T>> =>
    apiClient.patch(url, data, config),

  delete: <T>(url: string, config?: ApiClientConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete(url, config),
};

// Export individual methods for convenience
export { getAuthToken, setAuthToken, clearAuth };

// Export types
export type { ApiClientConfig, ApiResponse, ApiError };
