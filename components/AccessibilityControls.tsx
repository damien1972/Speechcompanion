// AccessibilityControls component for Speech Therapy Companion

import React from 'react';
import { useAccessibility } from '../lib/hooks';
import AccessibleText from './AccessibleText';
import AccessibleButton from './AccessibleButton';
import AccessibleCard from './AccessibleCard';

interface AccessibilityControlsProps {
  className?: string;
  showTitle?: boolean;
  compact?: boolean;
}

const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({
  className = '',
  showTitle = true,
  compact = false,
}) => {
  const {
    textSize,
    highContrast,
    reducedMotion,
    audioVolume,
    hapticFeedback,
    simplifiedVisuals,
    setTextSize,
    setHighContrast,
    setReducedMotion,
    setAudioVolume,
    setHapticFeedback,
    setSimplifiedVisuals,
    resetToDefaults,
  } = useAccessibility();

  // Helper function to create a toggle button
  const ToggleButton = ({ 
    label, 
    isActive, 
    onClick 
  }: { 
    label: string; 
    isActive: boolean; 
    onClick: () => void 
  }) => (
    <AccessibleButton
      onClick={onClick}
      variant={isActive ? 'primary' : 'secondary'}
      size={compact ? 'small' : 'medium'}
      className="w-full mb-2"
    >
      {label}
    </AccessibleButton>
  );

  return (
    <AccessibleCard
      variant="neutral"
      className={`p-4 ${className}`}
      ariaLabel="Accessibility controls"
    >
      {showTitle && (
        <AccessibleText variant="heading2" className="mb-4">
          Accessibility Settings
        </AccessibleText>
      )}

      <div className={compact ? 'grid grid-cols-2 gap-2' : 'space-y-4'}>
        {/* Text Size Controls */}
        <div className={compact ? 'col-span-2' : ''}>
          <AccessibleText variant="heading3" className="mb-2">
            Text Size
          </AccessibleText>
          <div className="flex space-x-2">
            <AccessibleButton
              onClick={() => setTextSize('standard')}
              variant={textSize === 'standard' ? 'primary' : 'neutral'}
              size={compact ? 'small' : 'medium'}
              className="flex-1"
            >
              Standard
            </AccessibleButton>
            <AccessibleButton
              onClick={() => setTextSize('large')}
              variant={textSize === 'large' ? 'primary' : 'neutral'}
              size={compact ? 'small' : 'medium'}
              className="flex-1"
            >
              Large
            </AccessibleButton>
            <AccessibleButton
              onClick={() => setTextSize('extra_large')}
              variant={textSize === 'extra_large' ? 'primary' : 'neutral'}
              size={compact ? 'small' : 'medium'}
              className="flex-1"
            >
              Extra Large
            </AccessibleButton>
          </div>
        </div>

        {/* Toggle Controls */}
        <div className={compact ? 'space-y-2' : 'grid grid-cols-2 gap-2'}>
          <ToggleButton
            label="High Contrast"
            isActive={highContrast}
            onClick={() => setHighContrast(!highContrast)}
          />
          <ToggleButton
            label="Reduced Motion"
            isActive={reducedMotion}
            onClick={() => setReducedMotion(!reducedMotion)}
          />
          <ToggleButton
            label="Haptic Feedback"
            isActive={hapticFeedback}
            onClick={() => setHapticFeedback(!hapticFeedback)}
          />
          <ToggleButton
            label="Simplified Visuals"
            isActive={simplifiedVisuals}
            onClick={() => setSimplifiedVisuals(!simplifiedVisuals)}
          />
        </div>

        {/* Volume Control */}
        {!compact && (
          <div>
            <AccessibleText variant="heading3" className="mb-2">
              Audio Volume: {audioVolume}%
            </AccessibleText>
            <div className="flex items-center space-x-2">
              <span>0%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={audioVolume}
                onChange={(e) => setAudioVolume(parseInt(e.target.value))}
                className="flex-1 h-8"
                aria-label="Audio volume control"
              />
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className={compact ? 'col-span-2 mt-2' : 'mt-4'}>
          <AccessibleButton
            onClick={resetToDefaults}
            variant="secondary"
            size={compact ? 'small' : 'medium'}
            className="w-full"
          >
            Reset to Defaults
          </AccessibleButton>
        </div>
      </div>
    </AccessibleCard>
  );
};

export default AccessibilityControls;
