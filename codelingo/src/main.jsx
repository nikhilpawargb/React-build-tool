import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Providers } from './app/provider'
import { Router } from './app/router'

// Initialize MSW in development
if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === 'true') {
  import('./testing/msw/browser').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'warn',
    });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <Router />
    </Providers>
  </StrictMode>,
)
