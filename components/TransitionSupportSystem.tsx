// TransitionSupportSystem component for Speech Therapy Companion

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../lib/hooks';
import { AccessibleText, AccessibleButton, AccessibleCard, AccessibleAnimation } from './index';

interface TransitionSupportSystemProps {
  currentActivity?: string;
  nextActivity?: string;
  currentImage?: string;
  nextImage?: string;
  countdownSeconds?: number;
  onTransitionComplete?: () => void;
  difficulty?: 'low' | 'moderate' | 'high';
  className?: string;
}

const TransitionSupportSystem: React.FC<TransitionSupportSystemProps> = ({
  currentActivity = 'Current Activity',
  nextActivity = 'Next Activity',
  currentImage = '',
  nextImage = '',
  countdownSeconds = 10,
  onTransitionComplete,
  difficulty = 'moderate',
  className = '',
}) => {
  const { reducedMotion, simplifiedVisuals, highContrast } = useAccessibility();
  
  const [isVisible, setIsVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(countdownSeconds);
  const [transitionPhase, setTransitionPhase] = useState<'initial' | 'countdown' | 'transition' | 'complete'>('initial');
  
  // Start the transition
  const startTransition = () => {
    setIsVisible(true);
    setTimeRemaining(countdownSeconds);
    setTransitionPhase('countdown');
  };
  
  // Complete the transition
  const completeTransition = () => {
    setTransitionPhase('complete');
    
    // Short delay before calling the completion handler
    setTimeout(() => {
      setIsVisible(false);
      if (onTransitionComplete) {
        onTransitionComplete();
      }
    }, 1000);
  };
  
  // Timer effect for countdown
  useEffect(() => {
    if (transitionPhase !== 'countdown') return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTransitionPhase('transition');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [transitionPhase]);
  
  // Effect for transition animation
  useEffect(() => {
    if (transitionPhase !== 'transition') return;
    
    const transitionTimer = setTimeout(() => {
      completeTransition();
    }, 3000); // 3 seconds for transition animation
    
    return () => clearTimeout(transitionTimer);
  }, [transitionPhase]);
  
  // Adjust visual complexity based on difficulty and accessibility settings
  const getVisualComplexity = () => {
    if (simplifiedVisuals) {
      return 'simple';
    }
    
    switch (difficulty) {
      case 'low':
        return 'simple';
      case 'moderate':
        return 'moderate';
      case 'high':
        return 'complex';
      default:
        return 'moderate';
    }
  };
  
  const visualComplexity = getVisualComplexity();
  
  // Default dragon guide SVG if no images provided
  const DragonGuide = () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M50,20 C60,10 80,10 90,20 C95,25 95,35 90,40 C85,45 75,45 70,40 C65,35 65,25 70,20 C75,15 85,15 90,20 M30,20 C40,10 60,10 70,20 C75,25 75,35 70,40 C65,45 55,45 50,40 C45,35 45,25 50,20 C55,15 65,15 70,20" fill={highContrast ? "#FF1493" : "#FF69B4"} stroke="#333" strokeWidth="2" />
      <circle cx="35" cy="30" r="5" fill="#333" />
      <circle cx="65" cy="30" r="5" fill="#333" />
      <path d="M50,50 Q60,60 50,70 Q40,60 50,50" fill="none" stroke="#333" strokeWidth="2" />
    </svg>
  );
  
  // Animation variants based on reduced motion setting
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  
  const contentVariants = {
    countdown: {
      x: reducedMotion ? 0 : [0, -5, 5, -5, 0],
      transition: { duration: 0.5, repeat: timeRemaining > 0 ? Infinity : 0 }
    },
    transition: {
      x: reducedMotion ? '100%' : [0, '100%'],
      transition: { duration: reducedMotion ? 1 : 3, ease: "easeInOut" }
    }
  };
  
  const nextContentVariants = {
    countdown: {
      x: '100%',
    },
    transition: {
      x: reducedMotion ? 0 : ['100%', 0],
      transition: { duration: reducedMotion ? 1 : 3, ease: "easeInOut" }
    }
  };
  
  return (
    <>
      {/* Button to trigger transition (for demo purposes) */}
      {!isVisible && (
        <AccessibleButton
          onClick={startTransition}
          variant="primary"
          className={className}
        >
          Preview Next Activity
        </AccessibleButton>
      )}
      
      {/* Transition overlay */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <AccessibleCard
              variant="neutral"
              className="w-full max-w-2xl p-0 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-purple-100 p-4 border-b border-purple-200">
                <AccessibleText variant="heading2" className="text-center">
                  {transitionPhase === 'transition' ? 'Changing Activity...' : 'Get Ready for Next Activity'}
                </AccessibleText>
              </div>
              
              {/* Content area */}
              <div className="relative overflow-hidden" style={{ height: '400px' }}>
                {/* Current activity content */}
                <motion.div
                  className="absolute inset-0 p-6 flex flex-col items-center"
                  variants={contentVariants}
                  animate={transitionPhase === 'countdown' ? 'countdown' : 'transition'}
                >
                  <AccessibleText variant="heading3" className="mb-4 text-center">
                    Current Activity: {currentActivity}
                  </AccessibleText>
                  
                  <div className="w-48 h-48 mb-4">
                    {currentImage ? (
                      <img src={currentImage} alt={currentActivity} className="w-full h-full object-contain" />
                    ) : (
                      <DragonGuide />
                    )}
                  </div>
                  
                  {transitionPhase === 'countdown' && (
                    <>
                      <AccessibleText variant="body" className="mb-4 text-center">
                        We'll be changing activities soon!
                      </AccessibleText>
                      
                      <div className="w-full max-w-xs bg-gray-200 rounded-full h-4 mb-4">
                        <motion.div
                          className="bg-pink-400 h-4 rounded-full"
                          initial={{ width: '100%' }}
                          animate={{ width: `${(timeRemaining / countdownSeconds) * 100}%` }}
                          transition={{ duration: 1, ease: "linear" }}
                        />
                      </div>
                      
                      <AccessibleText variant="heading2" className="text-center">
                        {timeRemaining}
                      </AccessibleText>
                    </>
                  )}
                </motion.div>
                
                {/* Next activity content */}
                <motion.div
                  className="absolute inset-0 p-6 flex flex-col items-center"
                  variants={nextContentVariants}
                  animate={transitionPhase === 'countdown' ? 'countdown' : 'transition'}
                >
                  <AccessibleText variant="heading3" className="mb-4 text-center">
                    Next Activity: {nextActivity}
                  </AccessibleText>
                  
                  <div className="w-48 h-48 mb-4">
                    {nextImage ? (
                      <img src={nextImage} alt={nextActivity} className="w-full h-full object-contain" />
                    ) : (
                      <DragonGuide />
                    )}
                  </div>
                  
                  <AccessibleText variant="body" className="mb-4 text-center">
                    Get ready for {nextActivity}!
                  </AccessibleText>
                  
                  {visualComplexity !== 'simple' && (
                    <AccessibleText variant="body" className="text-center text-gray-600">
                      In this activity, you'll {nextActivity.toLowerCase().includes('speech') 
                        ? 'practice speaking clearly' 
                        : 'have fun with dragons'}!
                    </AccessibleText>
                  )}
                </motion.div>
              </div>
              
              {/* Footer */}
              <div className="bg-purple-100 p-4 border-t border-purple-200 flex justify-between">
                <AccessibleButton
                  onClick={() => setIsVisible(false)}
                  variant="secondary"
                  size="medium"
                >
                  Cancel
                </AccessibleButton>
                
                <AccessibleButton
                  onClick={completeTransition}
                  variant="primary"
                  size="medium"
                >
                  {transitionPhase === 'countdown' ? 'Skip Countdown' : 'Continue'}
                </AccessibleButton>
              </div>
            </AccessibleCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TransitionSupportSystem;
