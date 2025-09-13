// Global type declarations for the CodeLingo application

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    mixpanel?: any;
    analytics?: any;
  }
}

// Utility types
export type Maybe<T> = T | null | undefined;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// API response wrapper
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Common entity base
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// File upload types
export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

// Search and filter types
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  page?: number;
  limit?: number;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | null;
  };
}

export interface FormError {
  field: string;
  message: string;
}

// Component prop types
export interface ComponentBaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

// Analytics event types
export interface AnalyticsEvent {
  name: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

// Learning content types
export type ContentType = 'video' | 'text' | 'exercise' | 'quiz' | 'project';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh';

// Progress tracking
export interface Progress {
  percentage: number;
  completedAt?: string;
  timeSpent: number; // in minutes
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  courses: string[];
  estimatedDuration: number;
  difficulty: DifficultyLevel;
}

// Notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

// Permission and role types
export type UserRole = 'student' | 'instructor' | 'admin' | 'moderator';

export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
  conditions?: Record<string, any>;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Environment types
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  API_URL: string;
  APP_NAME: string;
  APP_VERSION: string;
  FEATURES: {
    analytics: boolean;
    errorTracking: boolean;
    developmentTools: boolean;
  };
}

// Export everything as a module
export {};
