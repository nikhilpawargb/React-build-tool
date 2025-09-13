// Re-export all types from global.d.ts and other type files
export * from './global';

// Course-related types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
  };
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  duration: number; // in minutes
  lessonsCount: number;
  enrolledCount: number;
  rating: number;
  reviewsCount: number;
  price: number;
  discountedPrice?: number;
  thumbnail: string;
  previewVideo?: string;
  language: string;
  lastUpdated: string;
  isPublished: boolean;
  isFree: boolean;
  prerequisites: string[];
  learningObjectives: string[];
  targetAudience: string[];
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  lessons: Lesson[];
  isLocked: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'exercise' | 'quiz';
  order: number;
  duration: number; // in minutes
  content: LessonContent;
  isCompleted: boolean;
  isLocked: boolean;
  resources: Resource[];
}

export interface LessonContent {
  id: string;
  type: 'video' | 'text' | 'exercise' | 'quiz';
  data: VideoContent | TextContent | ExerciseContent | QuizContent;
}

export interface VideoContent {
  url: string;
  thumbnailUrl: string;
  duration: number;
  subtitles?: Subtitle[];
  chapters?: Chapter[];
}

export interface TextContent {
  markdown: string;
  estimatedReadTime: number;
}

export interface ExerciseContent {
  instructions: string;
  startingCode: string;
  solution: string;
  tests: Test[];
  hints: string[];
  language: string;
}

export interface QuizContent {
  questions: Question[];
  passingScore: number;
  allowRetry: boolean;
  timeLimit?: number; // in minutes
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in-blank' | 'code';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface Test {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Subtitle {
  language: string;
  url: string;
}

export interface Chapter {
  title: string;
  startTime: number; // in seconds
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'code' | 'image';
  url: string;
  description?: string;
}

// User progress and enrollment types
export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedAt?: string;
  progress: number; // 0-100
  lastAccessedAt: string;
  lastAccessedLesson?: string;
  certificateEarned: boolean;
  timeSpent: number; // in minutes
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  completedAt?: string;
  timeSpent: number; // in minutes
  attempts: number;
  score?: number; // for quizzes
}

export interface ExerciseSubmission {
  id: string;
  userId: string;
  exerciseId: string;
  code: string;
  isCorrect: boolean;
  submittedAt: string;
  feedback?: string;
  executionResult?: {
    output: string;
    errors: string[];
    testResults: TestResult[];
  };
}

export interface TestResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}

export interface QuizSubmission {
  id: string;
  userId: string;
  quizId: string;
  answers: QuizAnswer[];
  score: number;
  totalPoints: number;
  submittedAt: string;
  timeSpent: number; // in minutes
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  points: number;
}

// Certificate types
export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  templateId: string;
  earnedAt: string;
  verificationCode: string;
  downloadUrl: string;
  isValid: boolean;
}

// Review and rating types
export interface CourseReview {
  id: string;
  userId: string;
  courseId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  updatedAt: string;
  isHelpful: boolean;
  helpfulCount: number;
  user: {
    name: string;
    avatar?: string;
  };
}

// Search and filtering types
export interface CourseFilters {
  level?: ('beginner' | 'intermediate' | 'advanced')[];
  category?: string[];
  language?: string[];
  duration?: {
    min?: number;
    max?: number;
  };
  price?: 'free' | 'paid' | 'all';
  rating?: number;
}

export interface SearchResult {
  courses: Course[];
  total: number;
  facets: {
    levels: { value: string; count: number }[];
    categories: { value: string; count: number }[];
    languages: { value: string; count: number }[];
  };
}

// Analytics and tracking types
export interface LearningAnalytics {
  totalTimeSpent: number;
  coursesCompleted: number;
  lessonsCompleted: number;
  exercisesCompleted: number;
  averageScore: number;
  streakDays: number;
  skillProgress: SkillProgress[];
  weeklyActivity: WeeklyActivity[];
}

export interface SkillProgress {
  skill: string;
  level: number; // 0-100
  coursesCompleted: number;
  lastPracticed: string;
}

export interface WeeklyActivity {
  week: string; // ISO week string
  timeSpent: number;
  lessonsCompleted: number;
  exercisesCompleted: number;
}

// Discussion and community types
export interface Discussion {
  id: string;
  courseId?: string;
  lessonId?: string;
  userId: string;
  title: string;
  content: string;
  category: 'question' | 'general' | 'feedback' | 'bug-report';
  tags: string[];
  isResolved: boolean;
  isPinned: boolean;
  viewCount: number;
  likeCount: number;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    avatar?: string;
    role: string;
  };
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  userId: string;
  content: string;
  parentReplyId?: string;
  likeCount: number;
  isAcceptedAnswer: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    avatar?: string;
    role: string;
  };
}
