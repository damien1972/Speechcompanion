// DragonsDenReset component for Speech Therapy Companion

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from '../lib/hooks';
import { useAccessibility } from '../lib/hooks';
import { AccessibleText, AccessibleButton, AccessibleAnimation } from './index';

interface DragonsDenResetProps {
  onComplete?: () => void;
  duration?: number; // in seconds
  className?: string;
}

const DragonsDenReset: React.FC<DragonsDenResetProps> = ({
  onComplete,
  duration = 30,
  className = '',
}) => {
  const { startBreak, endBreak } = useSession();
  const { reducedMotion, simplifiedVisuals } = useAccessibility();
  
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // Start the reset space
  const startReset = () => {
    setIsActive(true);
    setTimeRemaining(duration);
    setBreathCount(0);
    startBreak('requested');
  };
  
  // End the reset space
  const endReset = () => {
    setIsActive(false);
    endBreak(5, 'Dragon\'s Den reset space completed successfully');
    if (onComplete) {
      onComplete();
    }
  };
  
  // Timer effect
  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isActive]);
  
  // Breathing animation effect
  useEffect(() => {
    if (!isActive) return;
    
    const breathingCycle = () => {
      // Inhale for 4 seconds
      setBreathingPhase('inhale');
      
      const holdTimeout = setTimeout(() => {
        // Hold for 2 seconds
        setBreathingPhase('hold');
        
        const exhaleTimeout = setTimeout(() => {
          // Exhale for 4 seconds
          setBreathingPhase('exhale');
          
          const completeTimeout = setTimeout(() => {
            setBreathCount(prev => prev + 1);
          }, 4000);
          
          return () => clearTimeout(completeTimeout);
        }, 2000);
        
        return () => clearTimeout(exhaleTimeout);
      }, 4000);
      
      return () => clearTimeout(holdTimeout);
    };
    
    const breathingInterval = setInterval(breathingCycle, 10000); // 10 seconds per full cycle
    breathingCycle(); // Start immediately
    
    return () => clearInterval(breathingInterval);
  }, [isActive]);
  
  // Dragon animation variants
  const dragonVariants = {
    inhale: {
      scale: reducedMotion ? 1.05 : 1.2,
      transition: { duration: 4, ease: "easeInOut" }
    },
    hold: {
      scale: reducedMotion ? 1.05 : 1.2,
      transition: { duration: 2, ease: "linear" }
    },
    exhale: {
      scale: 1,
      transition: { duration: 4, ease: "easeInOut" }
    }
  };
  
  // Background color based on breathing phase
  const getBackgroundColor = () => {
    switch (breathingPhase) {
      case 'inhale':
        return 'bg-gradient-to-br from-purple-100 to-pink-100';
      case 'hold':
        return 'bg-gradient-to-br from-purple-200 to-pink-200';
      case 'exhale':
        return 'bg-gradient-to-br from-purple-50 to-pink-50';
      default:
        return 'bg-gradient-to-br from-purple-100 to-pink-100';
    }
  };
  
  // Instruction text based on breathing phase
  const getInstructionText = () => {
    switch (breathingPhase) {
      case 'inhale':
        return 'Breathe in slowly...';
      case 'hold':
        return 'Hold your breath...';
      case 'exhale':
        return 'Breathe out slowly...';
      default:
        return 'Get ready to breathe...';
    }
  };
  
  return (
    <div className={`w-full max-w-4xl mx-auto rounded-xl overflow-hidden ${className}`}>
      {!isActive ? (
        <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 text-center">
          <AccessibleText variant="heading2" className="mb-4">
            Dragon's Den Reset Space
          </AccessibleText>
          <AccessibleText variant="body" className="mb-6">
            Need a little break? Visit the Dragon's Den for a calming moment.
          </AccessibleText>
          <AccessibleButton
            onClick={startReset}
            variant="primary"
            size="large"
          >
            Enter Dragon's Den
          </AccessibleButton>
        </div>
      ) : (
        <AccessibleAnimation type="fade">
          <div className={`p-6 ${getBackgroundColor()} transition-colors duration-1000 min-h-[400px] flex flex-col items-center justify-center`}>
            <AccessibleText variant="heading2" className="mb-4 text-center">
              Dragon's Den
            </AccessibleText>
            
            <div className="relative w-64 h-64 mb-6">
              <motion.div
                className="w-full h-full"
                animate={breathingPhase}
                variants={dragonVariants}
              >
                {/* Dragon SVG - simplified if needed */}
                <svg 
                  viewBox="0 0 200 200" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-full h-full ${simplifiedVisuals ? 'simple-svg' : ''}`}
                >
                  <path 
                    d="M100,30 C120,10 160,10 180,30 C190,40 190,60 180,70 C170,80 150,80 140,70 C130,60 130,40 140,30 C150,20 170,20 180,30 M60,30 C80,10 120,10 140,30 C150,40 150,60 140,70 C130,80 110,80 100,70 C90,60 90,40 100,30 C110,20 130,20 140,30 M100,70 C120,50 160,50 180,70 C190,80 190,100 180,110 C170,120 150,120 140,110 C130,100 130,80 140,70 C150,60 170,60 180,70 M60,70 C80,50 120,50 140,70 C150,80 150,100 140,110 C130,120 110,120 100,110 C90,100 90,80 100,70 C110,60 130,60 140,70" 
                    fill="#FF69B4" 
                    stroke="#333" 
                    strokeWidth="2"
                  />
                  <circle cx="70" cy="50" r="5" fill="#333"/>
                  <circle cx="130" cy="50" r="5" fill="#333"/>
                </svg>
              </motion.div>
              
              {/* Breathing indicator */}
              <motion.div
                className="absolute inset-0 border-4 border-purple-300 rounded-full opacity-50"
                animate={{
                  scale: breathingPhase === 'inhale' ? [1, 1.2] : 
                         breathingPhase === 'hold' ? 1.2 : [1.2, 1],
                  opacity: breathingPhase === 'hold' ? 0.7 : 0.5
                }}
                transition={{ 
                  duration: breathingPhase === 'inhale' || breathingPhase === 'exhale' ? 4 : 2,
                  ease: "easeInOut" 
                }}
              />
            </div>
            
            <AccessibleText variant="heading3" className="mb-2 text-center">
              {getInstructionText()}
            </AccessibleText>
            
            <AccessibleText variant="body" className="mb-6 text-center">
              Breath count: {breathCount}
            </AccessibleText>
            
            <div className="w-full max-w-sm bg-white bg-opacity-50 rounded-full h-4 mb-6">
              <div 
                className="bg-pink-400 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${(timeRemaining / duration) * 100}%` }}
              />
            </div>
            
            <AccessibleText variant="body" className="mb-6 text-center">
              Time remaining: {timeRemaining} seconds
            </AccessibleText>
            
            <AccessibleButton
              onClick={endReset}
              variant="secondary"
              size="medium"
            >
              Exit Early
            </AccessibleButton>
          </div>
        </AccessibleAnimation>
      )}
    </div>
  );
};

export default DragonsDenReset;
