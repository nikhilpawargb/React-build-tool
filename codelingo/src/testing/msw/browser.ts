import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { env } from '../../config/env';

// Setup MSW worker for browser environment
export const worker = setupWorker(...handlers);

// Start the worker in development mode if MSW is enabled
if (env.ENABLE_MSW && env.DEV) {
  worker.start({
    onUnhandledRequest: 'warn',
  });
}
