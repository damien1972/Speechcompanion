// Updated VisualSessionTimer Component with proper session context integration

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from '../lib/hooks';
import { formatTime } from '../lib/utils';
import { SESSION, THEME } from '../lib/constants';

interface VisualSessionTimerProps {
  showTimeLabels?: boolean;
  showMilestones?: boolean;
  onMilestoneReached?: (milestone: 'halfway' | 'near-end') => void;
}

const VisualSessionTimer: React.FC<VisualSessionTimerProps> = ({
  showTimeLabels = true,
  showMilestones = true,
  onMilestoneReached,
}) => {
  const { currentSession, elapsedTime, remainingTime, isSessionActive } = useSession();
  const [milestoneState, setMilestoneState] = useState({
    halfwayReached: false,
    nearEndReached: false,
  });

  // Calculate total session duration in seconds
  const totalDuration = currentSession ? currentSession.duration * 60 : SESSION.DEFAULT_DURATION * 60;
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (elapsedTime / totalDuration) * 100);
  
  // Check for milestones
  useEffect(() => {
    if (showMilestones && isSessionActive && onMilestoneReached) {
      // Halfway milestone
      if (!milestoneState.halfwayReached && progressPercentage >= 50) {
        setMilestoneState(prev => ({ ...prev, halfwayReached: true }));
        onMilestoneReached('halfway');
      }
      
      // Near end milestone (last 2 minutes)
      if (!milestoneState.nearEndReached && remainingTime <= SESSION.END_WARNING_TIME) {
        setMilestoneState(prev => ({ ...prev, nearEndReached: true }));
        onMilestoneReached('near-end');
      }
    }
  }, [progressPercentage, remainingTime, milestoneState, onMilestoneReached, isSessionActive, showMilestones]);

  // Reset milestone state when session changes
  useEffect(() => {
    setMilestoneState({
      halfwayReached: false,
      nearEndReached: false,
    });
  }, [currentSession]);

  // Generate stepping stones (activities)
  const generateSteppingStones = () => {
    if (!currentSession) return [];
    
    // Create an array of planned activities based on session duration
    // In a real app, this would use the actual planned activities
    const avgActivityDuration = SESSION.DEFAULT_ACTIVITY_DURATION * 60; // in seconds
    const totalActivities = Math.floor(totalDuration / avgActivityDuration);
    
    return Array.from({ length: totalActivities }, (_, i) => ({
      id: i.toString(),
      position: (i / (totalActivities - 1)) * 100,
      completed: progressPercentage >= ((i / (totalActivities - 1)) * 100),
      current: i === Math.floor(progressPercentage / (100 / (totalActivities - 1))),
    }));
  };

  const steppingStones = generateSteppingStones();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative pt-10 pb-16">
        {/* Dragon path background */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 rounded-full overflow-hidden">
          {/* Progress path with dragon scale pattern */}
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-full"
            style={{ 
              backgroundSize: '20px 20px',
              backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(255,255,255,0.3) 3px, transparent 0)'
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Stepping stones (activities) */}
        {steppingStones.map((stone) => (
          <div
            key={stone.id}
            className={`absolute top-0 w-10 h-10 -mt-1 -ml-5 rounded-full flex items-center justify-center transition-all duration-300 ${
              stone.current
                ? 'bg-yellow-400 scale-125 z-10'
                : stone.completed
                ? 'bg-purple-500'
                : 'bg-gray-300'
            }`}
            style={{ left: `${stone.position}%` }}
          >
            {stone.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 bg-pink-300 rounded-full"
              />
            )}
          </div>
        ))}

        {/* Dragon character (progress indicator) */}
        <motion.div
          className="absolute top-0 -mt-8 -ml-8 w-16 h-16 z-20"
          initial={{ left: '0%' }}
          animate={{ left: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full bg-contain bg-center bg-no-repeat"
               style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M50,20 C60,10 80,10 90,20 C95,25 95,35 90,40 C85,45 75,45 70,40 C65,35 65,25 70,20 C75,15 85,15 90,20 M30,20 C40,10 60,10 70,20 C75,25 75,35 70,40 C65,45 55,45 50,40 C45,35 45,25 50,20 C55,15 65,15 70,20 M50,40 C60,30 80,30 90,40 C95,45 95,55 90,60 C85,65 75,65 70,60 C65,55 65,45 70,40 C75,35 85,35 90,40 M30,40 C40,30 60,30 70,40 C75,45 75,55 70,60 C65,65 55,65 50,60 C45,55 45,45 50,40 C55,35 65,35 70,40\" fill=\"%23FF69B4\" stroke=\"%23333\" stroke-width=\"2\"/><circle cx=\"35\" cy=\"30\" r=\"5\" fill=\"%23333\"/><circle cx=\"65\" cy=\"30\" r=\"5\" fill=\"%23333\"/></svg>')" }}
          />
        </motion.div>

        {/* Time indicators */}
        {showTimeLabels && (
          <>
            <div className="absolute top-12 left-0 text-sm font-medium text-gray-600">
              {formatTime(0)}
            </div>
            <div className="absolute top-12 left-1/4 text-sm font-medium text-gray-600">
              {formatTime(totalDuration * 0.25)}
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-600">
              {formatTime(totalDuration * 0.5)}
            </div>
            <div className="absolute top-12 left-3/4 text-sm font-medium text-gray-600">
              {formatTime(totalDuration * 0.75)}
            </div>
            <div className="absolute top-12 right-0 text-sm font-medium text-gray-600">
              {formatTime(totalDuration)}
            </div>
          </>
        )}

        {/* Current time and remaining time */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          <div className="text-lg font-bold text-purple-700">
            {formatTime(elapsedTime)}
            <span className="ml-1 text-sm font-normal text-gray-600">elapsed</span>
          </div>
          <div className="text-lg font-bold text-pink-600">
            {formatTime(remainingTime)}
            <span className="ml-1 text-sm font-normal text-gray-600">remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualSessionTimer;
