// AccessibleText component for Speech Therapy Companion

import React from 'react';
import { useAccessibility } from '../lib/hooks';

interface AccessibleTextProps {
  children: React.ReactNode;
  variant?: 'body' | 'heading1' | 'heading2' | 'heading3' | 'caption';
  color?: string;
  className?: string;
}

const AccessibleText: React.FC<AccessibleTextProps> = ({
  children,
  variant = 'body',
  color,
  className = '',
}) => {
  const { textSize, highContrast } = useAccessibility();
  
  // Base font size mapping
  const baseSizeMap = {
    body: 'text-base',
    heading1: 'text-2xl',
    heading2: 'text-xl',
    heading3: 'text-lg',
    caption: 'text-sm',
  };
  
  // Text size adjustments based on accessibility settings
  const sizeAdjustments = {
    standard: {
      body: 'text-base',
      heading1: 'text-2xl',
      heading2: 'text-xl',
      heading3: 'text-lg',
      caption: 'text-sm',
    },
    large: {
      body: 'text-lg',
      heading1: 'text-3xl',
      heading2: 'text-2xl',
      heading3: 'text-xl',
      caption: 'text-base',
    },
    extra_large: {
      body: 'text-xl',
      heading1: 'text-4xl',
      heading2: 'text-3xl',
      heading3: 'text-2xl',
      caption: 'text-lg',
    },
  };
  
  // Font weight mapping
  const weightMap = {
    body: 'font-normal',
    heading1: 'font-bold',
    heading2: 'font-semibold',
    heading3: 'font-medium',
    caption: 'font-normal',
  };
  
  // Element mapping
  const elementMap = {
    body: 'p',
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    caption: 'span',
  };
  
  // Determine text size class based on accessibility settings
  const sizeClass = sizeAdjustments[textSize][variant];
  
  // Determine text color class based on high contrast setting
  const colorClass = highContrast 
    ? 'text-black dark:text-white' 
    : color ? `text-${color}` : '';
  
  // Combine all classes
  const combinedClassName = `${sizeClass} ${weightMap[variant]} ${colorClass} ${className}`;
  
  // Render the appropriate element based on variant
  const Element = elementMap[variant] as keyof JSX.IntrinsicElements;
  
  return (
    <Element className={combinedClassName}>
      {children}
    </Element>
  );
};

export default AccessibleText;
