// AccessibilityProvider wrapper component with storage key constant

import React from 'react';
import { STORAGE_KEYS } from '../lib/constants';
import { AccessibilityProvider as BaseAccessibilityProvider } from '../contexts/AccessibilityContext';

// Update storage keys to include accessibility settings
if (!STORAGE_KEYS.ACCESSIBILITY_SETTINGS) {
  STORAGE_KEYS.ACCESSIBILITY_SETTINGS = 'speech_therapy_accessibility_settings';
}

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  return <BaseAccessibilityProvider>{children}</BaseAccessibilityProvider>;
};
