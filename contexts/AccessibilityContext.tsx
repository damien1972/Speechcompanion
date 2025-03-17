// Accessibility Context for Speech Therapy Companion

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ACCESSIBILITY, STORAGE_KEYS } from '../lib/constants';
import { getFromStorage, saveToStorage } from '../lib/utils';

// Define the shape of the accessibility context
export interface AccessibilityContextType {
  textSize: 'standard' | 'large' | 'extra_large';
  highContrast: boolean;
  reducedMotion: boolean;
  audioVolume: number; // 0-100
  hapticFeedback: boolean;
  simplifiedVisuals: boolean;
  setTextSize: (size: 'standard' | 'large' | 'extra_large') => void;
  setHighContrast: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setAudioVolume: (volume: number) => void;
  setHapticFeedback: (enabled: boolean) => void;
  setSimplifiedVisuals: (enabled: boolean) => void;
  resetToDefaults: () => void;
}

// Default accessibility settings
const defaultAccessibilitySettings = {
  textSize: 'large' as const,
  highContrast: true,
  reducedMotion: false,
  audioVolume: 80,
  hapticFeedback: true,
  simplifiedVisuals: true,
};

// Create the accessibility context
export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// Props for the AccessibilityProvider component
interface AccessibilityProviderProps {
  children: ReactNode;
}

// AccessibilityProvider component
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState(defaultAccessibilitySettings);

  // Load settings from storage on mount
  useEffect(() => {
    const storedSettings = getFromStorage<typeof defaultAccessibilitySettings>(STORAGE_KEYS.ACCESSIBILITY_SETTINGS);
    if (storedSettings) {
      setSettings(storedSettings);
    }
  }, []);

  // Save settings to storage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ACCESSIBILITY_SETTINGS, settings);
  }, [settings]);

  // Set text size
  const setTextSize = (size: 'standard' | 'large' | 'extra_large') => {
    setSettings(prev => ({ ...prev, textSize: size }));
  };

  // Set high contrast
  const setHighContrast = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, highContrast: enabled }));
  };

  // Set reduced motion
  const setReducedMotion = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, reducedMotion: enabled }));
  };

  // Set audio volume
  const setAudioVolume = (volume: number) => {
    // Ensure volume is between 0 and 100
    const clampedVolume = Math.min(100, Math.max(0, volume));
    setSettings(prev => ({ ...prev, audioVolume: clampedVolume }));
  };

  // Set haptic feedback
  const setHapticFeedback = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, hapticFeedback: enabled }));
  };

  // Set simplified visuals
  const setSimplifiedVisuals = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, simplifiedVisuals: enabled }));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSettings(defaultAccessibilitySettings);
  };

  // Context value
  const contextValue: AccessibilityContextType = {
    ...settings,
    setTextSize,
    setHighContrast,
    setReducedMotion,
    setAudioVolume,
    setHapticFeedback,
    setSimplifiedVisuals,
    resetToDefaults,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};
