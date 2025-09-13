// Environment configuration
export const env = {
  // App Configuration
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'https://api.codelingo.com',
  API_VERSION: import.meta.env.VITE_API_VERSION || 'v1',
  
  // Authentication
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET,
  AUTH_COOKIE_NAME: import.meta.env.VITE_AUTH_COOKIE_NAME || 'codelingo_token',
  
  // External Services
  ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_TRACKING: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
  ENABLE_MSW: import.meta.env.VITE_ENABLE_MSW === 'true',
  
  // App Settings
  APP_NAME: import.meta.env.VITE_APP_NAME || 'CodeLingo',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Learn programming languages interactively',
  
  // Pagination
  DEFAULT_PAGE_SIZE: Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 20,
  MAX_PAGE_SIZE: Number(import.meta.env.VITE_MAX_PAGE_SIZE) || 100,
} as const;

// Validate required environment variables in production
if (env.PROD) {
  const requiredEnvVars = ['VITE_API_URL'];
  
  for (const envVar of requiredEnvVars) {
    if (!import.meta.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}
