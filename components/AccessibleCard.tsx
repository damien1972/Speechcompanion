// AccessibleCard component for Speech Therapy Companion

import React from 'react';
import { useAccessibility } from '../lib/hooks';
import { motion } from 'framer-motion';

interface AccessibleCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  interactive?: boolean;
  elevated?: boolean;
  className?: string;
  ariaLabel?: string;
}

const AccessibleCard: React.FC<AccessibleCardProps> = ({
  children,
  onClick,
  variant = 'neutral',
  interactive = false,
  elevated = false,
  className = '',
  ariaLabel,
}) => {
  const { highContrast, reducedMotion, simplifiedVisuals } = useAccessibility();
  
  // Color mapping based on variant and high contrast setting
  const colorMap = {
    primary: highContrast 
      ? 'bg-white border-pink-700 border-2' 
      : 'bg-pink-50 border-pink-200',
    secondary: highContrast 
      ? 'bg-white border-purple-700 border-2' 
      : 'bg-purple-50 border-purple-200',
    accent: highContrast 
      ? 'bg-white border-yellow-600 border-2' 
      : 'bg-yellow-50 border-yellow-200',
    neutral: highContrast 
      ? 'bg-white border-gray-700 border-2' 
      : 'bg-gray-50 border-gray-200',
  };
  
  // Shadow classes based on elevation and simplified visuals
  const shadowClass = elevated && !simplifiedVisuals 
    ? 'shadow-lg' 
    : elevated && simplifiedVisuals 
      ? 'shadow-md' 
      : 'shadow-sm';
  
  // Interactive classes
  const interactiveClass = interactive 
    ? 'cursor-pointer transition-all duration-200' 
    : '';
  
  // Combine all classes
  const combinedClassName = `rounded-lg border p-4 ${colorMap[variant]} ${shadowClass} ${interactiveClass} ${className}`;
  
  // Animation variants based on reduced motion setting
  const cardVariants = {
    tap: reducedMotion || !interactive 
      ? {} 
      : { scale: 0.98 },
    hover: reducedMotion || !interactive 
      ? {} 
      : { scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
  };
  
  return (
    <motion.div
      className={combinedClassName}
      onClick={onClick}
      whileTap={interactive ? "tap" : undefined}
      whileHover={interactive ? "hover" : undefined}
      variants={cardVariants}
      transition={{ duration: reducedMotion ? 0.1 : 0.2 }}
      role={interactive ? "button" : "region"}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </motion.div>
  );
};

export default AccessibleCard;
