import { cn } from '../../utils/helpers';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const loaderSizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <svg
        className={cn('animate-spin text-indigo-600 dark:text-indigo-400', loaderSizes[size])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

interface SpinnerOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export function SpinnerOverlay({ isLoading, children }: SpinnerOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center">
          <Loader size="lg" />
        </div>
      )}
    </div>
  );
}
