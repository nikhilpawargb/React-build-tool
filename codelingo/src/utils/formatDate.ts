/**
 * Formats a date object or string into a human-readable format
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

/**
 * Formats a date to relative time (e.g., "2 hours ago", "in 3 days")
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const units = [
    { name: 'year', ms: 31536000000 },
    { name: 'month', ms: 2628000000 },
    { name: 'day', ms: 86400000 },
    { name: 'hour', ms: 3600000 },
    { name: 'minute', ms: 60000 },
    { name: 'second', ms: 1000 },
  ];

  for (const unit of units) {
    const value = Math.floor(Math.abs(diff) / unit.ms);
    if (value >= 1) {
      return rtf.format(diff > 0 ? -value : value, unit.name as Intl.RelativeTimeFormatUnit);
    }
  }

  return 'just now';
}

/**
 * Formats a time duration in milliseconds to human-readable format
 * @param duration - Duration in milliseconds
 * @returns Formatted duration string
 */
export function formatDuration(duration: number): string {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Formats a time duration in minutes to human-readable format
 * @param minutes - Duration in minutes
 * @returns Formatted duration string (e.g., "1h 30m", "45m")
 */
export function formatMinutesToDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Converts a date to ISO string for API requests
 * @param date - Date to convert
 * @returns ISO string
 */
export function toISOString(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
}

/**
 * Checks if a date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Checks if a date is yesterday
 * @param date - Date to check
 * @returns True if date is yesterday
 */
export function isYesterday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Gets the start of day for a given date
 * @param date - Date to get start of day for
 * @returns Start of day date
 */
export function startOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj;
}

/**
 * Gets the end of day for a given date
 * @param date - Date to get end of day for
 * @returns End of day date
 */
export function endOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setHours(23, 59, 59, 999);
  return dateObj;
}

/**
 * Adds days to a date
 * @param date - Base date
 * @param days - Number of days to add
 * @returns New date with days added
 */
export function addDays(date: Date | string, days: number): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
}

/**
 * Subtracts days from a date
 * @param date - Base date
 * @param days - Number of days to subtract
 * @returns New date with days subtracted
 */
export function subtractDays(date: Date | string, days: number): Date {
  return addDays(date, -days);
}

/**
 * Formats time in 12-hour format
 * @param date - Date to format
 * @returns Time string in 12-hour format
 */
export function formatTime12Hour(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(dateObj);
}

/**
 * Formats time in 24-hour format
 * @param date - Date to format
 * @returns Time string in 24-hour format
 */
export function formatTime24Hour(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(dateObj);
}
