/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Password validation regex pattern
 * At least 8 characters, at least one uppercase letter, one lowercase letter, one number
 */
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

/**
 * Phone number validation regex pattern (US format)
 */
const PHONE_REGEX = /^\+?1?\d{9,15}$/;

/**
 * URL validation regex pattern
 */
const URL_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

/**
 * Validates an email address
 * @param email - Email to validate
 * @returns True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validates a password
 * @param password - Password to validate
 * @returns Object with validation result and error message
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/^[a-zA-Z\d@$!%*?&]+$/.test(password)) {
    errors.push('Password can only contain letters, numbers, and @$!%*?& symbols');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates if passwords match
 * @param password - Original password
 * @param confirmPassword - Confirmation password
 * @returns True if passwords match
 */
export function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

/**
 * Validates a phone number
 * @param phone - Phone number to validate
 * @returns True if valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return PHONE_REGEX.test(cleanPhone);
}

/**
 * Validates a URL
 * @param url - URL to validate
 * @returns True if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url.trim());
}

/**
 * Validates a required field
 * @param value - Value to validate
 * @returns True if not empty, false otherwise
 */
export function isRequired(value: string | number | boolean): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * Validates minimum length
 * @param value - Value to validate
 * @param minLength - Minimum required length
 * @returns True if meets minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength;
}

/**
 * Validates maximum length
 * @param value - Value to validate
 * @param maxLength - Maximum allowed length
 * @returns True if within maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength;
}

/**
 * Validates if a value is a number
 * @param value - Value to validate
 * @returns True if is a valid number
 */
export function isValidNumber(value: string | number): boolean {
  return !isNaN(Number(value)) && isFinite(Number(value));
}

/**
 * Validates if a number is within a range
 * @param value - Number to validate
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns True if within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validates if a value is a positive number
 * @param value - Value to validate
 * @returns True if positive number
 */
export function isPositiveNumber(value: string | number): boolean {
  const num = Number(value);
  return isValidNumber(value) && num > 0;
}

/**
 * Validates if a value contains only letters
 * @param value - Value to validate
 * @returns True if contains only letters
 */
export function isAlphabetic(value: string): boolean {
  return /^[a-zA-Z\s]+$/.test(value);
}

/**
 * Validates if a value contains only alphanumeric characters
 * @param value - Value to validate
 * @returns True if alphanumeric
 */
export function isAlphanumeric(value: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Validates a credit card number using Luhn algorithm
 * @param cardNumber - Credit card number to validate
 * @returns True if valid credit card number
 */
export function isValidCreditCard(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

/**
 * Validates a date string
 * @param dateString - Date string to validate
 * @returns True if valid date
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Validates if a date is in the future
 * @param dateString - Date string to validate
 * @returns True if date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  if (!isValidDate(dateString)) return false;
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
}

/**
 * Validates if a date is in the past
 * @param dateString - Date string to validate
 * @returns True if date is in the past
 */
export function isPastDate(dateString: string): boolean {
  if (!isValidDate(dateString)) return false;
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
}

/**
 * Validates age (must be 18 or older)
 * @param birthDate - Birth date string
 * @returns True if 18 or older
 */
export function isValidAge(birthDate: string): boolean {
  if (!isValidDate(birthDate)) return false;
  
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age >= 18;
}
