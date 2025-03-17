// AccessibleLayout component for Speech Therapy Companion

import React from 'react';
import { useAccessibility } from '../lib/hooks';
import { AccessibilityProvider } from './AccessibilityProvider';
import { SessionProvider } from '../contexts/SessionContext';

interface AccessibleLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AccessibleLayoutInner: React.FC<AccessibleLayoutProps> = ({
  children,
  className = '',
}) => {
  const { textSize, highContrast, simplifiedVisuals } = useAccessibility();
  
  // Base classes
  const baseClasses = 'min-h-screen transition-colors duration-300';
  
  // Text size classes
  const textSizeClasses = {
    standard: 'text-base',
    large: 'text-lg',
    extra_large: 'text-xl',
  };
  
  // Color scheme classes based on high contrast setting
  const colorClasses = highContrast
    ? 'bg-white text-black'
    : 'bg-purple-50 text-gray-800';
  
  // Visual complexity classes
  const visualClasses = simplifiedVisuals
    ? 'simple-layout'
    : '';
  
  // Combine all classes
  const combinedClassName = `${baseClasses} ${textSizeClasses[textSize]} ${colorClasses} ${visualClasses} ${className}`;
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

// Main component with providers
const AccessibleLayout: React.FC<AccessibleLayoutProps> = ({ children, className }) => {
  return (
    <SessionProvider>
      <AccessibilityProvider>
        <AccessibleLayoutInner className={className}>
          {children}
        </AccessibleLayoutInner>
      </AccessibilityProvider>
    </SessionProvider>
  );
};

export default AccessibleLayout;
