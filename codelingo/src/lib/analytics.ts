import { env } from '../config/env';

// Analytics events interface
// interface AnalyticsEvent {
//   event: string;
//   category?: string;
//   action?: string;
//   label?: string;
//   value?: number;
//   properties?: Record<string, any>;
//   userId?: string;
// }

// User properties interface
interface UserProperties {
  userId: string;
  email?: string;
  name?: string;
  role?: string;
  plan?: string;
  [key: string]: any;
}

class AnalyticsService {
  private isInitialized = false;
  private debugMode = env.DEV;

  constructor() {
    if (env.ENABLE_ANALYTICS && typeof window !== 'undefined') {
      this.initialize();
    }
  }

  private initialize() {
    try {
      // Initialize Google Analytics 4 if ID is provided
      if (env.ANALYTICS_ID) {
        this.initializeGA4();
      }

      // Initialize other analytics services here
      // this.initializeMixpanel();
      // this.initializeAmplitude();

      this.isInitialized = true;
      
      if (this.debugMode) {
        console.log('Analytics initialized');
      }
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }

  private initializeGA4() {
    if (!env.ANALYTICS_ID) return;

    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${env.ANALYTICS_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    const gtag = (...args: any[]) => {
      (window as any).dataLayer.push(args);
    };
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', env.ANALYTICS_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Set user identification
  identify(userId: string, properties?: UserProperties) {

    if (!this.isInitialized) return;

    try {
      // Google Analytics
      if (env.ANALYTICS_ID && (window as any).gtag) {
        (window as any).gtag('config', env.ANALYTICS_ID, {
          user_id: userId,
          custom_map: properties,
        });
      }

      // Add other analytics services here
      // if (window.mixpanel) {
      //   window.mixpanel.identify(userId);
      //   window.mixpanel.people.set(properties);
      // }

      if (this.debugMode) {
        console.log('Analytics user identified:', { userId, properties });
      }
    } catch (error) {
      console.error('Failed to identify user:', error);
    }
  }

  // Track custom events
  track(event: string, properties?: Record<string, any>) {
    if (!this.isInitialized) {
      if (this.debugMode) {
        console.log('Analytics not initialized, event tracked locally:', { event, properties });
      }
      return;
    }

    try {
      // Google Analytics
      if (env.ANALYTICS_ID && (window as any).gtag) {
        (window as any).gtag('event', event, {
          event_category: properties?.category || 'general',
          event_label: properties?.label,
          value: properties?.value,
          ...properties,
        });
      }

      // Add other analytics services here
      // if (window.mixpanel) {
      //   window.mixpanel.track(event, properties);
      // }

      if (this.debugMode) {
        console.log('Analytics event tracked:', { event, properties });
      }
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Track page views
  page(path?: string, title?: string, properties?: Record<string, any>) {
    if (!this.isInitialized) return;

    const pagePath = path || window.location.pathname;
    const pageTitle = title || document.title;

    try {
      // Google Analytics
      if (env.ANALYTICS_ID && (window as any).gtag) {
        (window as any).gtag('config', env.ANALYTICS_ID, {
          page_path: pagePath,
          page_title: pageTitle,
          ...properties,
        });
      }

      // Add other analytics services here
      // if (window.mixpanel) {
      //   window.mixpanel.track('Page View', {
      //     page: pagePath,
      //     title: pageTitle,
      //     ...properties,
      //   });
      // }

      if (this.debugMode) {
        console.log('Analytics page tracked:', { path: pagePath, title: pageTitle, properties });
      }
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  // Track learning events specifically for CodeLingo
  trackLearning = {
    courseStarted: (courseId: string, courseTitle: string) => {
      this.track('course_started', {
        category: 'learning',
        course_id: courseId,
        course_title: courseTitle,
      });
    },

    lessonCompleted: (courseId: string, lessonId: string, lessonTitle: string) => {
      this.track('lesson_completed', {
        category: 'learning',
        course_id: courseId,
        lesson_id: lessonId,
        lesson_title: lessonTitle,
      });
    },

    exerciseCompleted: (exerciseId: string, exerciseType: string, success: boolean) => {
      this.track('exercise_completed', {
        category: 'learning',
        exercise_id: exerciseId,
        exercise_type: exerciseType,
        success,
      });
    },

    quizCompleted: (quizId: string, score: number, totalQuestions: number) => {
      this.track('quiz_completed', {
        category: 'learning',
        quiz_id: quizId,
        score,
        total_questions: totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
      });
    },

    courseCompleted: (courseId: string, courseTitle: string, timeSpent: number) => {
      this.track('course_completed', {
        category: 'learning',
        course_id: courseId,
        course_title: courseTitle,
        time_spent_minutes: timeSpent,
      });
    },

    streakUpdated: (streakDays: number) => {
      this.track('streak_updated', {
        category: 'engagement',
        streak_days: streakDays,
      });
    },
  };

  // Track user actions
  trackUser = {
    signUp: (method: string) => {
      this.track('sign_up', {
        category: 'user',
        method,
      });
    },

    signIn: (method: string) => {
      this.track('sign_in', {
        category: 'user',
        method,
      });
    },

    profileUpdated: () => {
      this.track('profile_updated', {
        category: 'user',
      });
    },
  };

  // Clear user data (for logout)
  reset() {

    if (!this.isInitialized) return;

    try {
      // Clear user data from analytics services
      // Add service-specific reset logic here

      if (this.debugMode) {
        console.log('Analytics user data cleared');
      }
    } catch (error) {
      console.error('Failed to reset analytics:', error);
    }
  }
}

// Create and export the analytics instance
export const analytics = new AnalyticsService();

// Export the class for testing
export { AnalyticsService };

// Helper hook for React components
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    page: analytics.page.bind(analytics),
    identify: analytics.identify.bind(analytics),
    trackLearning: analytics.trackLearning,
    trackUser: analytics.trackUser,
    reset: analytics.reset.bind(analytics),
  };
}
