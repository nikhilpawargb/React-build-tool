import { http, HttpResponse } from 'msw';
import { apiEndpoints } from '../../config/api-endpoints';

// Mock data
const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'student',
  emailVerified: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const mockCourses = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming language',
    instructor: {
      id: '1',
      name: 'John Doe',
    },
    level: 'beginner',
    category: 'programming',
    tags: ['javascript', 'web-development'],
    duration: 480,
    lessonsCount: 24,
    enrolledCount: 1250,
    rating: 4.6,
    reviewsCount: 89,
    price: 0,
    thumbnail: '/javascript-course.jpg',
    language: 'en',
    lastUpdated: '2024-01-15T00:00:00Z',
    isPublished: true,
    isFree: true,
    prerequisites: [],
    learningObjectives: [
      'Understand JavaScript syntax and fundamentals',
      'Work with variables, functions, and objects',
      'Handle DOM manipulation',
    ],
    targetAudience: ['Complete beginners', 'Those new to programming'],
    modules: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'React Development',
    description: 'Build modern web applications with React',
    instructor: {
      id: '2',
      name: 'Jane Smith',
    },
    level: 'intermediate',
    category: 'programming',
    tags: ['react', 'javascript', 'frontend'],
    duration: 720,
    lessonsCount: 36,
    enrolledCount: 890,
    rating: 4.8,
    reviewsCount: 67,
    price: 99,
    thumbnail: '/react-course.jpg',
    language: 'en',
    lastUpdated: '2024-01-20T00:00:00Z',
    isPublished: true,
    isFree: false,
    prerequisites: ['JavaScript basics'],
    learningObjectives: [
      'Master React components and hooks',
      'Manage application state effectively',
      'Build scalable React applications',
    ],
    targetAudience: ['Developers with JavaScript knowledge'],
    modules: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
];

export const handlers = [
  // Auth handlers
  http.post(apiEndpoints.auth.login, async ({ request }) => {
    const body = await request.json() as any;
    
    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json({
        user: mockUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      });
    }
    
    return new HttpResponse(
      JSON.stringify({ message: 'Invalid credentials' }),
      { status: 401 }
    );
  }),

  http.post(apiEndpoints.auth.register, async ({ request }) => {
    const body = await request.json() as any;
    
    return HttpResponse.json({
      user: {
        ...mockUser,
        email: body.email,
        name: body.name,
      },
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
    });
  }),

  http.post(apiEndpoints.auth.logout, () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.get(apiEndpoints.auth.profile, () => {
    return HttpResponse.json(mockUser);
  }),

  // Course handlers
  http.get(apiEndpoints.course.list, ({ request }) => {
    const url = new URL(request.url);
    const level = url.searchParams.get('level');
    const category = url.searchParams.get('category');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    
    let filteredCourses = [...mockCourses];
    
    if (level) {
      filteredCourses = filteredCourses.filter(course => course.level === level);
    }
    
    if (category) {
      filteredCourses = filteredCourses.filter(course => course.category === category);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);
    
    return HttpResponse.json({
      data: paginatedCourses,
      pagination: {
        page,
        limit,
        total: filteredCourses.length,
        totalPages: Math.ceil(filteredCourses.length / limit),
        hasNext: endIndex < filteredCourses.length,
        hasPrev: page > 1,
      },
    });
  }),

  http.get(`${apiEndpoints.course.list}/:courseId`, ({ params }) => {
    const { courseId } = params;
    const course = mockCourses.find(c => c.id === courseId);
    
    if (!course) {
      return new HttpResponse(
        JSON.stringify({ message: 'Course not found' }),
        { status: 404 }
      );
    }
    
    return HttpResponse.json(course);
  }),

  // User profile handlers
  http.get(apiEndpoints.user.profile, () => {
    return HttpResponse.json(mockUser);
  }),

  http.put(apiEndpoints.user.updateProfile, async ({ request }) => {
    const body = await request.json() as any;
    
    return HttpResponse.json({
      ...mockUser,
      ...body,
      updatedAt: new Date().toISOString(),
    });
  }),

  // Progress handlers
  http.get(apiEndpoints.progress.overview, () => {
    return HttpResponse.json({
      totalCoursesEnrolled: 5,
      coursesCompleted: 2,
      totalTimeSpent: 2400, // in minutes
      currentStreak: 7,
      longestStreak: 14,
      weeklyGoalProgress: {
        target: 300,
        current: 240,
        percentage: 80,
      },
      recentActivity: [
        {
          type: 'lesson_completed',
          courseTitle: 'JavaScript Fundamentals',
          lessonTitle: 'Variables and Data Types',
          timestamp: '2024-01-20T10:30:00Z',
        },
        {
          type: 'exercise_completed',
          courseTitle: 'React Development',
          exerciseTitle: 'Component State Exercise',
          timestamp: '2024-01-19T14:15:00Z',
        },
      ],
    });
  }),

  // Error simulation handlers
  http.get('/api/error/500', () => {
    return new HttpResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 }
    );
  }),

  http.get('/api/error/404', () => {
    return new HttpResponse(
      JSON.stringify({ message: 'Not Found' }),
      { status: 404 }
    );
  }),

  // Delayed response handler for testing loading states
  http.get('/api/slow', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return HttpResponse.json({ message: 'Slow response' });
  }),
];
