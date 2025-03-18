// AccessibleButton component for Speech Therapy Companion

import React from 'react';
import { useAccessibility } from '../lib/hooks';
import { motion } from 'framer-motion';

interface AccessibleButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  "aria-label"?: string; // Changed from ReactNode to string and made optional
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  // other props...
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  className = '',
  onClick,
  disabled = false,
  "aria-label": ariaLabel,
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  ariaLabel,
  className = '',
}) => {
  const { textSize, highContrast, reducedMotion } = useAccessibility();
  
  // Color mapping based on variant
  const colorMap = {
    primary: highContrast 
      ? 'bg-pink-700 hover:bg-pink-800 text-white' 
      : 'bg-pink-500 hover:bg-pink-600 text-white',
    secondary: highContrast 
      ? 'bg-purple-700 hover:bg-purple-800 text-white' 
      : 'bg-purple-500 hover:bg-purple-600 text-white',
    accent: highContrast 
      ? 'bg-yellow-600 hover:bg-yellow-700 text-black' 
      : 'bg-yellow-400 hover:bg-yellow-500 text-black',
    success: highContrast 
      ? 'bg-green-700 hover:bg-green-800 text-white' 
      : 'bg-green-500 hover:bg-green-600 text-white',
    warning: highContrast 
      ? 'bg-orange-700 hover:bg-orange-800 text-white' 
      : 'bg-orange-500 hover:bg-orange-600 text-white',
    error: highContrast 
      ? 'bg-red-700 hover:bg-red-800 text-white' 
      : 'bg-red-500 hover:bg-red-600 text-white',
  };
  
  // Size mapping based on accessibility settings
  const sizeMap = {
    standard: {
      small: 'py-1 px-3 text-sm',
      medium: 'py-2 px-4 text-base',
      large: 'py-3 px-6 text-lg',
    },
    large: {
      small: 'py-2 px-4 text-base',
      medium: 'py-3 px-5 text-lg',
      large: 'py-4 px-7 text-xl',
    },
    extra_large: {
      small: 'py-3 px-5 text-lg',
      medium: 'py-4 px-6 text-xl',
      large: 'py-5 px-8 text-2xl',
    },
  };
  
  // Determine size class based on accessibility settings
  const sizeClass = sizeMap[textSize][size];
  
  // Determine width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Determine disabled class
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Combine all classes
  const combinedClassName = `rounded-lg font-medium focus:outline-none focus:ring-4 focus:ring-opacity-50 ${colorMap[variant]} ${sizeClass} ${widthClass} ${disabledClass} ${className}`;
  
  // Animation variants based on reduced motion setting
  const buttonVariants = {
    tap: reducedMotion 
      ? { scale: 0.98 } 
      : { scale: 0.95 },
    hover: reducedMotion 
      ? {} 
      : { scale: 1.02 },
  };
  
  return (
    <motion.button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      //aria-label={ariaLabel || typeof children === 'string' ? children : undefined}
      whileTap={!disabled ? "tap" : undefined}
      whileHover={!disabled ? "hover" : undefined}
      variants={buttonVariants}
      transition={{ duration: reducedMotion ? 0.1 : 0.2 }}
    >
      {children}
    </motion.button>
  );
};

export default AccessibleButton;
