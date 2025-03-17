// TherapistControls component for Speech Therapy Companion

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from '../lib/hooks';
import { useAccessibility } from '../lib/hooks';
import { AccessibleText, AccessibleButton, AccessibleCard, AccessibleIcon } from './index';
import { DIFFICULTY_LEVELS, TOKEN_ECONOMY } from '../lib/constants';

interface TherapistControlsProps {
  position?: 'left' | 'right' | 'bottom';
  collapsed?: boolean;
  className?: string;
}

const TherapistControls: React.FC<TherapistControlsProps> = ({
  position = 'right',
  collapsed: initialCollapsed = true,
  className = '',
}) => {
  const { 
    currentSession, 
    currentActivity, 
    startSession, 
    endSession, 
    startActivity, 
    endActivity, 
    startBreak, 
    recordIntervention,
    recordAchievement
  } = useSession();
  
  const { reducedMotion } = useAccessibility();
  
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [activeTab, setActiveTab] = useState<'session' | 'activity' | 'interventions' | 'tokens'>('session');
  
  // Position classes
  const positionClasses = {
    left: 'left-0 top-1/4 bottom-1/4',
    right: 'right-0 top-1/4 bottom-1/4',
    bottom: 'bottom-0 left-0 right-0',
  };
  
  // Width/height classes based on position and collapsed state
  const sizeClasses = {
    left: collapsed ? 'w-12 h-auto' : 'w-80 h-auto',
    right: collapsed ? 'w-12 h-auto' : 'w-80 h-auto',
    bottom: collapsed ? 'h-12 w-auto' : 'h-64 w-auto',
  };
  
  // Toggle collapsed state
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  // Handle quick interventions
  const handleIntervention = (type: 'attention' | 'motivation' | 'difficulty' | 'reset') => {
    if (currentActivity) {
      recordIntervention(type, 5, `Quick ${type} intervention`);
    }
  };
  
  // Handle token awards
  const handleAwardTokens = (amount: number) => {
    if (currentActivity) {
      endActivity(
        currentActivity.engagementLevel || 3,
        currentActivity.successRate || 50,
        amount,
        `Awarded ${amount} tokens`
      );
      
      // Start the same activity again to continue
      startActivity(
        currentActivity.activityType,
        currentActivity.targetSounds,
        currentActivity.targetPatterns,
        currentActivity.difficulty
      );
    }
  };
  
  // Handle achievement recording
  const handleRecordAchievement = (type: 'sound_mastery' | 'pattern_improvement' | 'engagement' | 'milestone') => {
    if (currentSession) {
      recordAchievement(
        type,
        `Achievement: ${type.replace('_', ' ')}`,
        'Dragon token',
        `Therapist recorded ${type} achievement`
      );
    }
  };
  
  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'session':
        return (
          <div className="p-4">
            <AccessibleText variant="heading3" className="mb-4">
              Session Controls
            </AccessibleText>
            
            {!currentSession ? (
              <AccessibleButton
                onClick={() => startSession('patient-123', 'therapist-456')}
                variant="primary"
                className="w-full mb-2"
              >
                Start Session
              </AccessibleButton>
            ) : (
              <>
                <div className="mb-4">
                  <AccessibleText variant="body" className="mb-1">
                    Session ID: {currentSession.id.substring(0, 8)}...
                  </AccessibleText>
                  <AccessibleText variant="body" className="mb-1">
                    Status: {currentSession.status}
                  </AccessibleText>
                  <AccessibleText variant="body">
                    Tokens: {currentSession.tokensEarned}
                  </AccessibleText>
                </div>
                
                <AccessibleButton
                  onClick={endSession}
                  variant="error"
                  className="w-full"
                >
                  End Session
                </AccessibleButton>
              </>
            )}
          </div>
        );
        
      case 'activity':
        return (
          <div className="p-4">
            <AccessibleText variant="heading3" className="mb-4">
              Activity Controls
            </AccessibleText>
            
            {currentSession && (
              <>
                {!currentActivity ? (
                  <div className="space-y-2">
                    <AccessibleText variant="body" className="mb-2">
                      Start Activity:
                    </AccessibleText>
                    
                    <AccessibleButton
                      onClick={() => startActivity('DragonSpeechQuest', ['s', 'r'], ['initial consonant deletion'], DIFFICULTY_LEVELS.MODERATE)}
                      variant="primary"
                      className="w-full mb-2"
                    >
                      Dragon Speech Quest
                    </AccessibleButton>
                    
                    <AccessibleButton
                      onClick={() => startActivity('DragonExpertRolePlay', ['s', 'r'], ['initial consonant deletion'], DIFFICULTY_LEVELS.MODERATE)}
                      variant="primary"
                      className="w-full mb-2"
                    >
                      Dragon Expert Role Play
                    </AccessibleButton>
                    
                    <AccessibleButton
                      onClick={() => startActivity('PronunciationGame', ['s', 'r'], ['initial consonant deletion'], DIFFICULTY_LEVELS.MODERATE)}
                      variant="primary"
                      className="w-full"
                    >
                      Pronunciation Game
                    </AccessibleButton>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <AccessibleText variant="body" className="mb-1">
                        Current: {currentActivity.activityType}
                      </AccessibleText>
                      <AccessibleText variant="body">
                        Difficulty: {currentActivity.difficulty}
                      </AccessibleText>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <AccessibleButton
                        onClick={() => endActivity(3, 50, 1, 'Activity completed')}
                        variant="secondary"
                        size="small"
                      >
                        End Activity
                      </AccessibleButton>
                      
                      <AccessibleButton
                        onClick={() => startBreak('requested')}
                        variant="accent"
                        size="small"
                      >
                        Take Break
                      </AccessibleButton>
                    </div>
                    
                    <AccessibleText variant="body" className="mb-2">
                      Adjust Difficulty:
                    </AccessibleText>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <AccessibleButton
                        onClick={() => startActivity(currentActivity.activityType, currentActivity.targetSounds, currentActivity.targetPatterns, DIFFICULTY_LEVELS.EASY)}
                        variant={currentActivity.difficulty === DIFFICULTY_LEVELS.EASY ? 'primary' : 'neutral'}
                        size="small"
                      >
                        Easy
                      </AccessibleButton>
                      
                      <AccessibleButton
                        onClick={() => startActivity(currentActivity.activityType, currentActivity.targetSounds, currentActivity.targetPatterns, DIFFICULTY_LEVELS.MODERATE)}
                        variant={currentActivity.difficulty === DIFFICULTY_LEVELS.MODERATE ? 'primary' : 'neutral'}
                        size="small"
                      >
                        Medium
                      </AccessibleButton>
                      
                      <AccessibleButton
                        onClick={() => startActivity(currentActivity.activityType, currentActivity.targetSounds, currentActivity.targetPatterns, DIFFICULTY_LEVELS.CHALLENGING)}
                        variant={currentActivity.difficulty === DIFFICULTY_LEVELS.CHALLENGING ? 'primary' : 'neutral'}
                        size="small"
                      >
                        Hard
                      </AccessibleButton>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        );
        
      case 'interventions':
        return (
          <div className="p-4">
            <AccessibleText variant="heading3" className="mb-4">
              Quick Interventions
            </AccessibleText>
            
            {currentActivity ? (
              <>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <AccessibleButton
                    onClick={() => handleIntervention('attention')}
                    variant="warning"
                    className="w-full"
                  >
                    Attention
                  </AccessibleButton>
                  
                  <AccessibleButton
                    onClick={() => handleIntervention('motivation')}
                    variant="success"
                    className="w-full"
                  >
                    Motivation
                  </AccessibleButton>
                  
                  <AccessibleButton
                    onClick={() => handleIntervention('difficulty')}
                    variant="secondary"
                    className="w-full"
                  >
                    Adjust Difficulty
                  </AccessibleButton>
                  
                  <AccessibleButton
                    onClick={() => handleIntervention('reset')}
                    variant="error"
                    className="w-full"
                  >
                    Reset
                  </AccessibleButton>
                </div>
                
                <AccessibleText variant="heading3" className="mb-2">
                  Record Achievement
                </AccessibleText>
                
                <div className="grid grid-cols-2 gap-2">
                  <AccessibleButton
                    onClick={() => handleRecordAchievement('sound_mastery')}
                    variant="accent"
                    size="small"
                  >
                    Sound Mastery
                  </AccessibleButton>
                  
                  <AccessibleButton
                    onClick={() => handleRecordAchievement('pattern_improvement')}
                    variant="accent"
                    size="small"
                  >
                    Pattern Improvement
                  </AccessibleButton>
                  
                  <AccessibleButton
                    onClick={() => handleRecordAchievement('engagement')}
                    variant="accent"
                    size="small"
                  >
                    Engagement
                  </AccessibleButton>
                  
                  <AccessibleButton
                    onClick={() => handleRecordAchievement('milestone')}
                    variant="accent"
                    size="small"
                  >
                    Milestone
                  </AccessibleButton>
                </div>
              </>
            ) : (
              <AccessibleText variant="body" className="text-gray-500 italic">
                Start an activity to enable interventions
              </AccessibleText>
            )}
          </div>
        );
        
      case 'tokens':
        return (
          <div className="p-4">
            <AccessibleText variant="heading3" className="mb-4">
              Token Economy
            </AccessibleText>
            
            {currentActivity ? (
              <>
                <AccessibleText variant="body" className="mb-2">
                  Award Tokens:
                </AccessibleText>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {TOKEN_ECONOMY.QUICK_INCREMENTS.map(amount => (
                    <AccessibleButton
                      key={amount}
                      onClick={() => handleAwardTokens(amount)}
                      variant="primary"
                      size="medium"
                    >
                      +{amount}
                    </AccessibleButton>
                  ))}
                </div>
                
                <AccessibleText variant="body" className="mb-2">
                  Custom Amount:
                </AccessibleText>
                
                <div className="grid grid-cols-3 gap-2">
                  {[5, 10, 20].map(amount => (
                    <AccessibleButton
                      key={amount}
                      onClick={() => handleAwardTokens(amount)}
                      variant="secondary"
                      size="medium"
                    >
                      +{amount}
                    </AccessibleButton>
                  ))}
                </div>
              </>
            ) : (
              <AccessibleText variant="body" className="text-gray-500 italic">
                Start an activity to award tokens
              </AccessibleText>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Render collapsed view
  const renderCollapsed = () => (
    <div className="h-full w-full flex items-center justify-center">
      <button
        onClick={toggleCollapsed}
        className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
        aria-label="Open therapist controls"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-700">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      </button>
    </div>
  );
  
  // Render expanded view
  const renderExpanded = () => (
    <div className="h-full w-full flex flex-col">
      {/* Header with close button */}
      <div className="bg-purple-600 text-white p-2 flex justify-between items-center">
        <AccessibleText variant="heading3" className="text-white">
          Therapist Controls
        </AccessibleText>
        
        <button
          onClick={toggleCollapsed}
          className="p-1 hover:bg-purple-500 rounded transition-colors"
          aria-label="Close therapist controls"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      
      {/* Tab navigation <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>