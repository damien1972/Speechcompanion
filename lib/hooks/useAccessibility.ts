// useAccessibility hook for Speech Therapy Companion

import { useContext } from 'react';
import { AccessibilityContext, AccessibilityContextType } from '../../contexts/AccessibilityContext';

/**
 * Hook to access the accessibility context
 * @returns Accessibility context values and methods
 */
export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  
  return context;
};
