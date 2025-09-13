import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup MSW server for Node.js environment (testing)
export const server = setupServer(...handlers);

// Configure server for different environments
export const mswConfig = {
  // Start server before all tests
  beforeAll: () => {
    server.listen({ onUnhandledRequest: 'error' });
  },
  
  // Reset handlers after each test
  afterEach: () => {
    server.resetHandlers();
  },
  
  // Clean up after all tests
  afterAll: () => {
    server.close();
  },
};
