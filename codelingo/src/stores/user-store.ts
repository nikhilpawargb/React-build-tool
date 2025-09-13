import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserPreferences {
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  autoPlayVideos: boolean;
  darkMode: boolean;
}

interface UserProgress {
  totalCoursesStarted: number;
  totalCoursesCompleted: number;
  totalLessonsCompleted: number;
  totalExercisesCompleted: number;
  totalQuizzesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  totalLearningTime: number; // in minutes
  lastActiveDate: string;
  weeklyGoal: number; // minutes per week
  dailyGoal: number; // minutes per day
}

interface UserAchievements {
  badges: Array<{
    id: string;
    name: string;
    description: string;
    earnedAt: string;
    category: string;
  }>;
  milestones: Array<{
    id: string;
    name: string;
    target: number;
    current: number;
    completed: boolean;
    completedAt?: string;
  }>;
}

interface UserState {
  // User settings and preferences
  preferences: UserPreferences;
  
  // Learning progress tracking
  progress: UserProgress;
  
  // Achievements and badges
  achievements: UserAchievements;
  
  // Current session data
  currentCourse: string | null;
  currentLesson: string | null;
  sessionStartTime: number | null;
  
  // Recently accessed content
  recentCourses: Array<{
    id: string;
    title: string;
    progress: number;
    lastAccessed: string;
  }>;
  
  recentLessons: Array<{
    id: string;
    title: string;
    courseId: string;
    courseTitle: string;
    lastAccessed: string;
  }>;
  
  // Learning goals and statistics
  weeklyStats: {
    timeSpent: number;
    lessonsCompleted: number;
    exercisesCompleted: number;
    currentWeek: string;
  };
  
  monthlyStats: {
    timeSpent: number;
    coursesCompleted: number;
    currentMonth: string;
  };
}

interface UserActions {
  // Preferences
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  
  // Progress tracking
  updateProgress: (progress: Partial<UserProgress>) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  addLearningTime: (minutes: number) => void;
  
  // Achievement management
  addBadge: (badge: UserAchievements['badges'][0]) => void;
  updateMilestone: (milestoneId: string, current: number) => void;
  
  // Session management
  startSession: (courseId?: string, lessonId?: string) => void;
  endSession: () => number; // returns session duration in minutes
  updateCurrentContent: (courseId?: string, lessonId?: string) => void;
  
  // Recent content
  addRecentCourse: (course: UserState['recentCourses'][0]) => void;
  addRecentLesson: (lesson: UserState['recentLessons'][0]) => void;
  
  // Statistics
  updateWeeklyStats: (stats: Partial<UserState['weeklyStats']>) => void;
  updateMonthlyStats: (stats: Partial<UserState['monthlyStats']>) => void;
  
  // Utility actions
  resetUserData: () => void;
}

type UserStore = UserState & UserActions;

const initialPreferences: UserPreferences = {
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  emailNotifications: true,
  pushNotifications: true,
  soundEnabled: true,
  autoPlayVideos: false,
  darkMode: false,
};

const initialProgress: UserProgress = {
  totalCoursesStarted: 0,
  totalCoursesCompleted: 0,
  totalLessonsCompleted: 0,
  totalExercisesCompleted: 0,
  totalQuizzesCompleted: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalLearningTime: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  weeklyGoal: 300, // 5 hours per week
  dailyGoal: 30, // 30 minutes per day
};

const initialAchievements: UserAchievements = {
  badges: [],
  milestones: [
    {
      id: 'first-lesson',
      name: 'First Steps',
      target: 1,
      current: 0,
      completed: false,
    },
    {
      id: 'ten-lessons',
      name: 'Getting Started',
      target: 10,
      current: 0,
      completed: false,
    },
    {
      id: 'first-course',
      name: 'Course Conqueror',
      target: 1,
      current: 0,
      completed: false,
    },
    {
      id: 'seven-day-streak',
      name: 'Week Warrior',
      target: 7,
      current: 0,
      completed: false,
    },
  ],
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        preferences: initialPreferences,
        progress: initialProgress,
        achievements: initialAchievements,
        currentCourse: null,
        currentLesson: null,
        sessionStartTime: null,
        recentCourses: [],
        recentLessons: [],
        weeklyStats: {
          timeSpent: 0,
          lessonsCompleted: 0,
          exercisesCompleted: 0,
          currentWeek: new Date().toISOString().split('T')[0],
        },
        monthlyStats: {
          timeSpent: 0,
          coursesCompleted: 0,
          currentMonth: new Date().toISOString().substring(0, 7),
        },

        // Actions
        updatePreferences: (preferences) =>
          set((state) => ({
            preferences: { ...state.preferences, ...preferences },
          })),

        updateProgress: (progress) =>
          set((state) => ({
            progress: { ...state.progress, ...progress },
          })),

        incrementStreak: () =>
          set((state) => {
            const newStreak = state.progress.currentStreak + 1;
            return {
              progress: {
                ...state.progress,
                currentStreak: newStreak,
                longestStreak: Math.max(newStreak, state.progress.longestStreak),
                lastActiveDate: new Date().toISOString().split('T')[0],
              },
            };
          }),

        resetStreak: () =>
          set((state) => ({
            progress: { ...state.progress, currentStreak: 0 },
          })),

        addLearningTime: (minutes) =>
          set((state) => ({
            progress: {
              ...state.progress,
              totalLearningTime: state.progress.totalLearningTime + minutes,
            },
          })),

        addBadge: (badge) =>
          set((state) => ({
            achievements: {
              ...state.achievements,
              badges: [...state.achievements.badges, badge],
            },
          })),

        updateMilestone: (milestoneId, current) =>
          set((state) => ({
            achievements: {
              ...state.achievements,
              milestones: state.achievements.milestones.map((milestone) =>
                milestone.id === milestoneId
                  ? {
                      ...milestone,
                      current,
                      completed: current >= milestone.target,
                      completedAt:
                        current >= milestone.target && !milestone.completed
                          ? new Date().toISOString()
                          : milestone.completedAt,
                    }
                  : milestone
              ),
            },
          })),

        startSession: (courseId, lessonId) =>
          set({
            currentCourse: courseId || null,
            currentLesson: lessonId || null,
            sessionStartTime: Date.now(),
          }),

        endSession: () => {
          const state = get();
          if (!state.sessionStartTime) return 0;
          
          const duration = Math.round((Date.now() - state.sessionStartTime) / (1000 * 60));
          get().addLearningTime(duration);
          
          set({
            sessionStartTime: null,
          });
          
          return duration;
        },

        updateCurrentContent: (courseId, lessonId) =>
          set({
            currentCourse: courseId || null,
            currentLesson: lessonId || null,
          }),

        addRecentCourse: (course) =>
          set((state) => {
            const filtered = state.recentCourses.filter((c) => c.id !== course.id);
            return {
              recentCourses: [course, ...filtered].slice(0, 10),
            };
          }),

        addRecentLesson: (lesson) =>
          set((state) => {
            const filtered = state.recentLessons.filter((l) => l.id !== lesson.id);
            return {
              recentLessons: [lesson, ...filtered].slice(0, 10),
            };
          }),

        updateWeeklyStats: (stats) =>
          set((state) => ({
            weeklyStats: { ...state.weeklyStats, ...stats },
          })),

        updateMonthlyStats: (stats) =>
          set((state) => ({
            monthlyStats: { ...state.monthlyStats, ...stats },
          })),

        resetUserData: () =>
          set({
            preferences: initialPreferences,
            progress: initialProgress,
            achievements: initialAchievements,
            currentCourse: null,
            currentLesson: null,
            sessionStartTime: null,
            recentCourses: [],
            recentLessons: [],
            weeklyStats: {
              timeSpent: 0,
              lessonsCompleted: 0,
              exercisesCompleted: 0,
              currentWeek: new Date().toISOString().split('T')[0],
            },
            monthlyStats: {
              timeSpent: 0,
              coursesCompleted: 0,
              currentMonth: new Date().toISOString().substring(0, 7),
            },
          }),
      }),
      {
        name: 'user-store',
        partialize: (state) => ({
          preferences: state.preferences,
          progress: state.progress,
          achievements: state.achievements,
          recentCourses: state.recentCourses,
          recentLessons: state.recentLessons,
          weeklyStats: state.weeklyStats,
          monthlyStats: state.monthlyStats,
        }),
      }
    ),
    { name: 'user-store' }
  )
);

// Selectors
export const useUserPreferences = () => useUserStore((state) => state.preferences);
export const useUserProgress = () => useUserStore((state) => state.progress);
export const useUserAchievements = () => useUserStore((state) => state.achievements);
export const useCurrentSession = () => useUserStore((state) => ({
  currentCourse: state.currentCourse,
  currentLesson: state.currentLesson,
  sessionStartTime: state.sessionStartTime,
}));
export const useRecentContent = () => useUserStore((state) => ({
  courses: state.recentCourses,
  lessons: state.recentLessons,
}));
export const useUserStats = () => useUserStore((state) => ({
  weekly: state.weeklyStats,
  monthly: state.monthlyStats,
}));
