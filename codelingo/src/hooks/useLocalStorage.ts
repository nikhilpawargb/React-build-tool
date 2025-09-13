import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for localStorage with SSR support
 * @param key - The localStorage key
 * @param initialValue - The initial value if key doesn't exist
 * @returns [value, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Save state
        setStoredValue(valueToStore);
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Function to remove the value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to the localStorage key from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

/**
 * Custom hook for sessionStorage with SSR support
 * @param key - The sessionStorage key
 * @param initialValue - The initial value if key doesn't exist
 * @returns [value, setValue, removeValue]
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to sessionStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Save state
        setStoredValue(valueToStore);
        
        // Save to sessionStorage
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Function to remove the value from sessionStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook that provides a boolean flag and functions to set, toggle, and clear it
 * Persists the state in localStorage
 * @param key - The localStorage key
 * @param initialValue - The initial boolean value
 * @returns [value, toggle, setTrue, setFalse, reset]
 */
export function useLocalStorageFlag(
  key: string,
  initialValue = false
): [boolean, () => void, () => void, () => void, () => void] {
  const [value, setValue, removeValue] = useLocalStorage(key, initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), [setValue]);
  const setTrue = useCallback(() => setValue(true), [setValue]);
  const setFalse = useCallback(() => setValue(false), [setValue]);
  const reset = useCallback(() => removeValue(), [removeValue]);

  return [value, toggle, setTrue, setFalse, reset];
}

/**
 * Hook for storing arrays in localStorage with helper methods
 * @param key - The localStorage key
 * @param initialValue - The initial array value
 * @returns [array, addItem, removeItem, updateItem, clearArray, setArray]
 */
export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[] = []
): [
  T[],
  (item: T) => void,
  (index: number) => void,
  (index: number, item: T) => void,
  () => void,
  (array: T[]) => void
] {
  const [array, setArray] = useLocalStorage<T[]>(key, initialValue);

  const addItem = useCallback(
    (item: T) => {
      setArray(prev => [...prev, item]);
    },
    [setArray]
  );

  const removeItem = useCallback(
    (index: number) => {
      setArray(prev => prev.filter((_, i) => i !== index));
    },
    [setArray]
  );

  const updateItem = useCallback(
    (index: number, item: T) => {
      setArray(prev => prev.map((existingItem, i) => (i === index ? item : existingItem)));
    },
    [setArray]
  );

  const clearArray = useCallback(() => {
    setArray([]);
  }, [setArray]);

  return [array, addItem, removeItem, updateItem, clearArray, setArray];
}
