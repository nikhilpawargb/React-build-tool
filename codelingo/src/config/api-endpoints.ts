import { env } from './env';

// Base API configuration
const API_BASE_URL = `${env.API_URL}/${env.API_VERSION}`;

// Authentication endpoints
export const authEndpoints = {
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  logout: `${API_BASE_URL}/auth/logout`,
  refresh: `${API_BASE_URL}/auth/refresh`,
  profile: `${API_BASE_URL}/auth/profile`,
  forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
  resetPassword: `${API_BASE_URL}/auth/reset-password`,
  verifyEmail: `${API_BASE_URL}/auth/verify-email`,
} as const;

// User endpoints
export const userEndpoints = {
  profile: `${API_BASE_URL}/users/profile`,
  updateProfile: `${API_BASE_URL}/users/profile`,
  changePassword: `${API_BASE_URL}/users/change-password`,
  preferences: `${API_BASE_URL}/users/preferences`,
  progress: `${API_BASE_URL}/users/progress`,
  achievements: `${API_BASE_URL}/users/achievements`,
  streak: `${API_BASE_URL}/users/streak`,
} as const;

// Course endpoints
export const courseEndpoints = {
  list: `${API_BASE_URL}/courses`,
  details: (courseId: string) => `${API_BASE_URL}/courses/${courseId}`,
  enroll: (courseId: string) => `${API_BASE_URL}/courses/${courseId}/enroll`,
  unenroll: (courseId: string) => `${API_BASE_URL}/courses/${courseId}/unenroll`,
  progress: (courseId: string) => `${API_BASE_URL}/courses/${courseId}/progress`,
  reviews: (courseId: string) => `${API_BASE_URL}/courses/${courseId}/reviews`,
  addReview: (courseId: string) => `${API_BASE_URL}/courses/${courseId}/reviews`,
  
  // Module endpoints
  modules: (courseId: string) => `${API_BASE_URL}/courses/${courseId}/modules`,
  moduleDetails: (courseId: string, moduleId: string) => 
    `${API_BASE_URL}/courses/${courseId}/modules/${moduleId}`,
  
  // Lesson endpoints
  lessons: (courseId: string, moduleId: string) => 
    `${API_BASE_URL}/courses/${courseId}/modules/${moduleId}/lessons`,
  lessonDetails: (courseId: string, moduleId: string, lessonId: string) =>
    `${API_BASE_URL}/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
  completeLesson: (courseId: string, moduleId: string, lessonId: string) =>
    `${API_BASE_URL}/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/complete`,
} as const;

// Exercise endpoints
export const exerciseEndpoints = {
  list: `${API_BASE_URL}/exercises`,
  details: (exerciseId: string) => `${API_BASE_URL}/exercises/${exerciseId}`,
  submit: (exerciseId: string) => `${API_BASE_URL}/exercises/${exerciseId}/submit`,
  solutions: (exerciseId: string) => `${API_BASE_URL}/exercises/${exerciseId}/solutions`,
  hints: (exerciseId: string) => `${API_BASE_URL}/exercises/${exerciseId}/hints`,
} as const;

// Quiz endpoints
export const quizEndpoints = {
  list: `${API_BASE_URL}/quizzes`,
  details: (quizId: string) => `${API_BASE_URL}/quizzes/${quizId}`,
  submit: (quizId: string) => `${API_BASE_URL}/quizzes/${quizId}/submit`,
  results: (quizId: string) => `${API_BASE_URL}/quizzes/${quizId}/results`,
} as const;

// Progress endpoints
export const progressEndpoints = {
  overview: `${API_BASE_URL}/progress/overview`,
  courses: `${API_BASE_URL}/progress/courses`,
  course: (courseId: string) => `${API_BASE_URL}/progress/courses/${courseId}`,
  update: `${API_BASE_URL}/progress/update`,
  stats: `${API_BASE_URL}/progress/stats`,
} as const;

// Certificate endpoints
export const certificateEndpoints = {
  list: `${API_BASE_URL}/certificates`,
  generate: (courseId: string) => `${API_BASE_URL}/certificates/generate/${courseId}`,
  download: (certificateId: string) => `${API_BASE_URL}/certificates/${certificateId}/download`,
  verify: (certificateId: string) => `${API_BASE_URL}/certificates/${certificateId}/verify`,
} as const;

// Search endpoints
export const searchEndpoints = {
  courses: `${API_BASE_URL}/search/courses`,
  exercises: `${API_BASE_URL}/search/exercises`,
  global: `${API_BASE_URL}/search/global`,
} as const;

// Analytics endpoints
export const analyticsEndpoints = {
  track: `${API_BASE_URL}/analytics/track`,
  events: `${API_BASE_URL}/analytics/events`,
  learningTime: `${API_BASE_URL}/analytics/learning-time`,
} as const;

// Notification endpoints
export const notificationEndpoints = {
  list: `${API_BASE_URL}/notifications`,
  markRead: (notificationId: string) => `${API_BASE_URL}/notifications/${notificationId}/read`,
  markAllRead: `${API_BASE_URL}/notifications/read-all`,
  preferences: `${API_BASE_URL}/notifications/preferences`,
} as const;

// Content endpoints
export const contentEndpoints = {
  upload: `${API_BASE_URL}/content/upload`,
  download: (fileId: string) => `${API_BASE_URL}/content/download/${fileId}`,
  delete: (fileId: string) => `${API_BASE_URL}/content/${fileId}`,
} as const;

// Admin endpoints (if user has admin privileges)
export const adminEndpoints = {
  users: `${API_BASE_URL}/admin/users`,
  courses: `${API_BASE_URL}/admin/courses`,
  analytics: `${API_BASE_URL}/admin/analytics`,
  reports: `${API_BASE_URL}/admin/reports`,
} as const;

// Health check and system endpoints
export const systemEndpoints = {
  health: `${API_BASE_URL}/health`,
  version: `${API_BASE_URL}/version`,
  status: `${API_BASE_URL}/status`,
} as const;

// Consolidated endpoints object
export const apiEndpoints = {
  auth: authEndpoints,
  user: userEndpoints,
  course: courseEndpoints,
  exercise: exerciseEndpoints,
  quiz: quizEndpoints,
  progress: progressEndpoints,
  certificate: certificateEndpoints,
  search: searchEndpoints,
  analytics: analyticsEndpoints,
  notification: notificationEndpoints,
  content: contentEndpoints,
  admin: adminEndpoints,
  system: systemEndpoints,
} as const;

// Helper function to build query string
export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

// Helper function to build endpoint with query params
export function buildEndpoint(
  endpoint: string, 
  params?: Record<string, string | number | boolean | undefined>
): string {
  if (!params) return endpoint;
  return `${endpoint}${buildQueryString(params)}`;
}
