import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';
import { vi } from 'vitest';

// Create a custom render function that includes providers
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface TestProvidersProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

function TestProviders({ children, queryClient }: TestProvidersProps) {
  const testQueryClient = queryClient || createTestQueryClient();
  
  return (
    <QueryClientProvider client={testQueryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const { queryClient, ...renderOptions } = options;
  
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <TestProviders queryClient={queryClient}>
      {children}
    </TestProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };

// Test utilities
export const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'student' as const,
  emailVerified: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

export const createMockCourse = (overrides = {}) => ({
  id: '1',
  title: 'Test Course',
  description: 'A test course',
  instructor: {
    id: '1',
    name: 'Test Instructor',
  },
  level: 'beginner' as const,
  category: 'programming',
  tags: ['javascript', 'web'],
  duration: 480,
  lessonsCount: 12,
  enrolledCount: 150,
  rating: 4.5,
  reviewsCount: 30,
  price: 99,
  thumbnail: '/course-thumbnail.jpg',
  language: 'en',
  lastUpdated: '2024-01-01T00:00:00Z',
  isPublished: true,
  isFree: false,
  prerequisites: [],
  learningObjectives: ['Learn JavaScript basics'],
  targetAudience: ['Beginners'],
  modules: [],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

export const createMockLesson = (overrides = {}) => ({
  id: '1',
  moduleId: '1',
  title: 'Test Lesson',
  description: 'A test lesson',
  type: 'video' as const,
  order: 1,
  duration: 15,
  content: {
    id: '1',
    type: 'video' as const,
    data: {
      url: '/test-video.mp4',
      thumbnailUrl: '/test-thumbnail.jpg',
      duration: 900,
    },
  },
  isCompleted: false,
  isLocked: false,
  resources: [],
  ...overrides,
});

// Mock local storage
export const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
})();

// Mock session storage
export const mockSessionStorage = mockLocalStorage;

// Setup function for tests
export const setupTests = () => {
  // Mock localStorage
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });

  // Mock sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage,
  });

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
};

// Wait for API calls to settle
export const waitForApiCalls = () => new Promise(resolve => setTimeout(resolve, 0));

// Create mock API response
export function mockApiResponse<T>(data: T, status = 200) {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {},
  };
}

// Create mock error response
export const mockApiError = (message = 'API Error', status = 500) => ({
  response: {
    data: { message },
    status,
    statusText: 'Internal Server Error',
    headers: {},
    config: {},
  },
  message,
  status,
});
