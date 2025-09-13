import { useState, useEffect } from 'react';

/**
 * Custom hook for media queries
 * @param query - The media query string
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with false to avoid hydration mismatch
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handler);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks
 */
export const useBreakpoints = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)');

  // Common breakpoints
  const isSmall = useMediaQuery('(max-width: 639px)');
  const isMedium = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
  const isLarge = useMediaQuery('(min-width: 1024px)');

  // Specific checks
  const isMobileOrTablet = useMediaQuery('(max-width: 1023px)');
  const isTabletOrDesktop = useMediaQuery('(min-width: 768px)');

  return {
    // Device types
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    
    // Size categories
    isSmall,
    isMedium,
    isLarge,
    
    // Combined checks
    isMobileOrTablet,
    isTabletOrDesktop,
    
    // Orientation
    isPortrait: useMediaQuery('(orientation: portrait)'),
    isLandscape: useMediaQuery('(orientation: landscape)'),
    
    // High DPI screens
    isRetina: useMediaQuery('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'),
    
    // Reduced motion preference
    prefersReducedMotion: useMediaQuery('(prefers-reduced-motion: reduce)'),
    
    // Dark mode preference
    prefersDarkMode: useMediaQuery('(prefers-color-scheme: dark)'),
  };
};

/**
 * Hook for checking if screen width is above a certain breakpoint
 * @param breakpoint - The breakpoint value in pixels
 * @returns boolean indicating if screen is above the breakpoint
 */
export function useMinWidth(breakpoint: number): boolean {
  return useMediaQuery(`(min-width: ${breakpoint}px)`);
}

/**
 * Hook for checking if screen width is below a certain breakpoint
 * @param breakpoint - The breakpoint value in pixels
 * @returns boolean indicating if screen is below the breakpoint
 */
export function useMaxWidth(breakpoint: number): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

/**
 * Hook for checking if screen width is between two breakpoints
 * @param minBreakpoint - The minimum breakpoint value in pixels
 * @param maxBreakpoint - The maximum breakpoint value in pixels
 * @returns boolean indicating if screen is within the range
 */
export function useBetweenWidths(minBreakpoint: number, maxBreakpoint: number): boolean {
  return useMediaQuery(`(min-width: ${minBreakpoint}px) and (max-width: ${maxBreakpoint - 1}px)`);
}
