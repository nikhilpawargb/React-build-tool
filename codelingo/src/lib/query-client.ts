import { QueryClient } from '@tanstack/react-query';
import { env } from '../config/env';

// Create and configure the React Query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - data is considered fresh for this duration
      staleTime: 1000 * 60 * 5, // 5 minutes
      
      // Cache time - how long unused data stays in cache
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      
      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry for 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Don't refetch on window focus in development
      refetchOnWindowFocus: env.PROD,
      
      // Don't refetch on reconnect in development
      refetchOnReconnect: env.PROD,
      
      // Background refetch interval (disabled by default)
      refetchInterval: false,
      
      // Network mode
      networkMode: 'online',
    },
    mutations: {
      // Retry mutations once on network error
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 1;
      },
      
      // Network mode for mutations
      networkMode: 'online',
    },
  },
});

// Global error handler for mutations
queryClient.setMutationDefaults(['default'], {
  onError: (error: any) => {
    console.error('Mutation error:', error);
    
    // You can add global error handling here
    // For example, show a toast notification
    if (env.DEV) {
      console.error('Mutation failed:', error);
    }
  },
});

// Removed setQueryDefaults with onError as it's not supported
// Query errors should be handled in individual query hooks or components

// Utility functions for cache management
export const queryUtils = {
  // Clear all cached data
  clearAll: () => {
    queryClient.clear();
  },
  
  // Clear specific query by key
  clearQuery: (queryKey: string[]) => {
    queryClient.removeQueries({ queryKey });
  },
  
  // Invalidate and refetch specific query
  invalidateQuery: (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey });
  },
  
  // Prefetch a query
  prefetchQuery: (queryKey: string[], queryFn: () => Promise<any>) => {
    return queryClient.prefetchQuery({ queryKey, queryFn });
  },
  
  // Set query data manually
  setQueryData: (queryKey: string[], data: any) => {
    queryClient.setQueryData(queryKey, data);
  },
  
  // Get cached query data
  getQueryData: (queryKey: string[]) => {
    return queryClient.getQueryData(queryKey);
  },
  
  // Cancel outgoing queries
  cancelQueries: (queryKey?: string[]) => {
    return queryClient.cancelQueries({ queryKey });
  },
};
