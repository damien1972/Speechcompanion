// lib/utils.ts - Utility functions for Speech Therapy Companion

/**
 * Generate a unique ID
 * @returns A unique string ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Format time in seconds to a readable format (MM:SS)
 * @param seconds Time in seconds
 * @returns Formatted time string
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Save data to local storage
 * @param key Storage key
 * @param data Data to store
 */
export const saveToStorage = <T>(key: string, data: T): void => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
};

/**
 * Get data from local storage
 * @param key Storage key
 * @returns Retrieved data or null if not found
 */
export const getFromStorage = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return null;
    }
  }
  return null;
};

/**
 * Remove data from local storage
 * @param key Storage key
 */
export const removeFromStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Capitalize the first letter of a string
 * @param str String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Check if the device supports touch events
 * @returns Boolean indicating touch support
 */
export const isTouchDevice = (): boolean => {
  if (typeof window !== 'undefined') {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  return false;
};

/**
 * Trigger haptic feedback if supported
 * @param intensity Vibration intensity in milliseconds
 */
export const triggerHapticFeedback = (intensity: number = 50): void => {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(intensity);
    } catch (error) {
      console.error('Error triggering haptic feedback:', error);
    }
  }
};
