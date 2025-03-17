// TokenEconomyVisualizer component for Speech Therapy Companion

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from '../lib/hooks';
import { useAccessibility } from '../lib/hooks';
import { AccessibleText, AccessibleButton, AccessibleCard, AccessibleAnimation } from './index';
import { TOKEN_ECONOMY } from '../lib/constants';

interface TokenEconomyVisualizerProps {
  targetTokens?: number;
  rewardName?: string;
  rewardImage?: string;
  className?: string;
}

const TokenEconomyVisualizer: React.FC<TokenEconomyVisualizerProps> = ({
  targetTokens = 20,
  rewardName = 'Special Dragon',
  rewardImage = '',
  className = '',
}) => {
  const { currentSession } = useSession();
  const { reducedMotion, simplifiedVisuals, highContrast } = useAccessibility();
  
  const [tokens, setTokens] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState<number[]>([]);
  
  // Update tokens when session changes
  useEffect(() => {
    if (currentSession) {
      setTokens(currentSession.tokensEarned);
    }
  }, [currentSession]);
  
  // Show celebration when reaching milestones
  useEffect(() => {
    if (tokens > 0 && tokens % 5 === 0) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [tokens]);
  
  // Add tokens function
  const addTokens = (amount: number) => {
    setTokens(prev => prev + amount);
    setRecentlyAdded(prev => [...prev, amount]);
    
    // Clear recent additions after animation
    setTimeout(() => {
      setRecentlyAdded([]);
    }, 2000);
  };
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (tokens / targetTokens) * 100);
  
  // Token item component
  const TokenItem = ({ index }: { index: number }) => {
    const isRecent = recentlyAdded.length > 0 && index >= tokens - recentlyAdded.reduce((a, b) => a + b, 0);
    
    return (
      <motion.div
        className={`w-8 h-8 rounded-full ${
          highContrast ? 'bg-pink-700' : 'bg-pink-400'
        } flex items-center justify-center text-white font-bold`}
        initial={isRecent ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: reducedMotion ? 'tween' : 'spring',
          stiffness: 300,
          damping: 15,
          duration: reducedMotion ? 0.2 : undefined
        }}
      >
        {index + 1}
      </motion.div>
    );
  };
  
  // Celebration animation
  const Celebration = () => (
    <AccessibleAnimation type={reducedMotion ? 'fade' : 'scale'}>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white bg-opacity-80 p-6 rounded-xl text-center">
          <AccessibleText variant="heading2" className="mb-2">
            Great job!
          </AccessibleText>
          <AccessibleText variant="body" className="mb-4">
            You've earned {tokens} tokens!
          </AccessibleText>
          <motion.div
            animate={{ 
              rotate: reducedMotion ? 0 : [0, 10, -10, 10, 0],
              scale: reducedMotion ? 1.05 : [1, 1.2, 1, 1.1, 1]
            }}
            transition={{ duration: 1, repeat: 1 }}
            className="w-24 h-24 mx-auto mb-4"
          >
            {/* Dragon egg or gem SVG */}
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="60" rx="30" ry="35" fill="#FF69B4" />
              <ellipse cx="50" cy="40" rx="20" ry="25" fill="#9370DB" />
              <path d="M50,15 Q65,25 65,40 Q65,55 50,65 Q35,55 35,40 Q35,25 50,15" fill="#FFD700" />
              <circle cx="45" cy="35" r="5" fill="white" fillOpacity="0.7" />
            </svg>
          </motion.div>
          <AccessibleButton
            onClick={() => setShowCelebration(false)}
            variant="primary"
            size="medium"
          >
            Continue
          </AccessibleButton>
        </div>
      </div>
    </AccessibleAnimation>
  );
  
  return (
    <AccessibleCard
      variant="neutral"
      className={`p-4 relative ${className}`}
    >
      <AnimatePresence>
        {showCelebration && <Celebration />}
      </AnimatePresence>
      
      <div className={`${showCelebration ? 'opacity-50' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <AccessibleText variant="heading2">
            Token Collection
          </AccessibleText>
          <div className="flex space-x-2">
            {TOKEN_ECONOMY.QUICK_INCREMENTS.map(amount => (
              <AccessibleButton
                key={amount}
                onClick={() => addTokens(amount)}
                variant="secondary"
                size="small"
              >
                +{amount}
              </AccessibleButton>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <AccessibleText variant="body" className="mb-2">
            Tokens: {tokens} / {targetTokens}
          </AccessibleText>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div
              className="bg-gradient-to-r from-pink-400 to-purple-500 h-4 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-end mb-4">
          <div>
            <AccessibleText variant="heading3" className="mb-2">
              Working toward:
            </AccessibleText>
            <AccessibleText variant="body">
              {rewardName}
            </AccessibleText>
          </div>
          
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
            {rewardImage ? (
              <img src={rewardImage} alt={rewardName} className="max-w-full max-h-full" />
            ) : (
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                <path d="M50,20 C60,10 80,10 90,20 C95,25 95,35 90,40 C85,45 75,45 70,40 C65,35 65,25 70,20 C75,15 85,15 90,20 M30,20 C40,10 60,10 70,20 C75,25 75,35 70,40 C65,45 55,45 50,40 C45,35 45,25 50,20 C55,15 65,15 70,20" fill="#9370DB" stroke="#333" strokeWidth="2" />
                <circle cx="35" cy="30" r="5" fill="#333" />
                <circle cx="65" cy="30" r="5" fill="#333" />
              </svg>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <AccessibleText variant="heading3" className="mb-2">
            Tokens Earned:
          </AccessibleText>
          
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2">
            {Array.from({ length: tokens }).map((_, index) => (
              <TokenItem key={index} index={index} />
            ))}
            
            {tokens === 0 && (
              <AccessibleText variant="body" className="text-gray-500 italic">
                No tokens earned yet. Complete activities to earn tokens!
              </AccessibleText>
            )}
          </div>
        </div>
      </div>
    </AccessibleCard>
  );
};

export default TokenEconomyVisualizer;
