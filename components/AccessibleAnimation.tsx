// AccessibleAnimation component for Speech Therapy Companion

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAccessibility } from '../lib/hooks';

interface AccessibleAnimationProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'bounce' | 'pulse';
  isVisible?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  onAnimationComplete?: () => void;
}

const AccessibleAnimation: React.FC<AccessibleAnimationProps> = ({
  children,
  type = 'fade',
  isVisible = true,
  duration = 0.5,
  delay = 0,
  className = '',
  onAnimationComplete,
}) => {
  const { reducedMotion } = useAccessibility();
  
  // Adjust duration based on reduced motion setting
  const adjustedDuration = reducedMotion ? Math.min(0.2, duration / 2) : duration;
  
  // Animation variants based on type and reduced motion setting
  const getVariants = (): Variants => {
    if (reducedMotion) {
      // Simplified animations for reduced motion
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }
    
    // Full animations based on type
    switch (type) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case 'slide':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
        };
      case 'bounce':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 15,
            }
          },
          exit: { opacity: 0, y: -20 },
        };
      case 'pulse':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: [0.9, 1.05, 1],
            transition: {
              times: [0, 0.7, 1]
            }
          },
          exit: { opacity: 0, scale: 0.8 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };
  
  const variants = getVariants();
  
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={className}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ 
            duration: adjustedDuration, 
            delay,
            ease: 'easeOut'
          }}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccessibleAnimation;
