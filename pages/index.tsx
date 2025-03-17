// Main App Page for Speech Therapy Companion

import React, { useState } from 'react';
import {
  AccessibleLayout,
  AccessibleText,
  AccessibleButton,
  AccessibleCard,
  VisualSessionTimer,
  DragonsDenReset,
  TokenEconomyVisualizer,
  TransitionSupportSystem,
  TherapistControls,
  DragonSpeechQuest
} from '../components';
import { useSession } from '../lib/hooks';

export default function Home() {
  const { 
    currentSession, 
    isSessionActive, 
    startSession, 
    endSession 
  } = useSession();
  
  const [currentView, setCurrentView] = useState<'welcome' | 'activity' | 'break'>('welcome');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  
  // Handle session start
  const handleStartSession = () => {
    startSession('patient-123', 'therapist-456');
    setCurrentView('welcome');
  };
  
  // Handle activity selection
  const handleSelectActivity = (activity: string) => {
    setSelectedActivity(activity);
    setCurrentView('activity');
  };
  
  // Handle break request
  const handleBreakRequest = () => {
    setCurrentView('break');
  };
  
  // Handle break completion
  const handleBreakComplete = () => {
    setCurrentView('welcome');
  };
  
  // Render welcome screen
  const renderWelcome = () => (
    <div className="max-w-4xl mx-auto p-4">
      <AccessibleCard variant="primary" className="mb-6 p-6 text-center">
        <AccessibleText variant="heading1" className="mb-4">
          Welcome to Dragon Speech Adventure!
        </AccessibleText>
        
        <div className="w-32 h-32 mx-auto mb-4">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,20 C60,10 80,10 90,20 C95,25 95,35 90,40 C85,45 75,45 70,40 C65,35 65,25 70,20 C75,15 85,15 90,20 M30,20 C40,10 60,10 70,20 C75,25 75,35 70,40 C65,45 55,45 50,40 C45,35 45,25 50,20 C55,15 65,15 70,20" fill="#FF69B4" stroke="#333" strokeWidth="2" />
            <circle cx="35" cy="30" r="5" fill="#333" />
            <circle cx="65" cy="30" r="5" fill="#333" />
            <path d="M50,50 Q60,60 50,70 Q40,60 50,50" fill="none" stroke="#333" strokeWidth="2" />
          </svg>
        </div>
        
        <AccessibleText variant="body" className="mb-6">
          Let's practice our speech with friendly dragons! Choose an activity to begin.
        </AccessibleText>
        
        {!isSessionActive ? (
          <AccessibleButton
            onClick={handleStartSession}
            variant="primary"
            size="large"
          >
            Start Session
          </AccessibleButton>
        ) : (
          <AccessibleText variant="heading3" className="mb-4">
            Session in progress!
          </AccessibleText>
        )}
      </AccessibleCard>
      
      {isSessionActive && (
        <>
          <div className="mb-6">
            <VisualSessionTimer 
              showTimeLabels={true}
              showMilestones={true}
              onMilestoneReached={(milestone) => {
                console.log(`Milestone reached: ${milestone}`);
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AccessibleCard
              variant="secondary"
              className="p-4 text-center"
              interactive={true}
              onClick={() => handleSelectActivity('DragonSpeechQuest')}
            >
              <AccessibleText variant="heading2" className="mb-2">
                Dragon Speech Quest
              </AccessibleText>
              <AccessibleText variant="body">
                Practice your speech sounds with the friendly dragon!
              </AccessibleText>
            </AccessibleCard>
            
            <AccessibleCard
              variant="accent"
              className="p-4 text-center"
              interactive={true}
              onClick={handleBreakRequest}
            >
              <AccessibleText variant="heading2" className="mb-2">
                Dragon's Den
              </AccessibleText>
              <AccessibleText variant="body">
                Need a break? Visit the Dragon's Den for a calming moment.
              </AccessibleText>
            </AccessibleCard>
          </div>
          
          <div className="mb-6">
            <TokenEconomyVisualizer 
              targetTokens={20}
              rewardName="Special Dragon Friend"
            />
          </div>
        </>
      )}
    </div>
  );
  
  // Render activity screen
  const renderActivity = () => (
    <div className="max-w-4xl mx-auto p-4">
      {selectedActivity === 'DragonSpeechQuest' && (
        <DragonSpeechQuest 
          targetSounds={['s', 'r', 'l']}
          targetWords={['star', 'rainbow', 'light', 'sparkle', 'dragon']}
          onComplete={(success, tokensEarned) => {
            console.log(`Activity completed: ${success ? 'Success' : 'Failed'}, Tokens: ${tokensEarned}`);
            setCurrentView('welcome');
          }}
        />
      )}
      
      <div className="mt-6 flex justify-between">
        <AccessibleButton
          onClick={() => setCurrentView('welcome')}
          variant="secondary"
        >
          Back to Activities
        </AccessibleButton>
        
        <AccessibleButton
          onClick={handleBreakRequest}
          variant="accent"
        >
          Take a Break
        </AccessibleButton>
      </div>
    </div>
  );
  
  // Render break screen
  const renderBreak = () => (
    <div className="max-w-4xl mx-auto p-4">
      <DragonsDenReset 
        onComplete={handleBreakComplete}
        duration={30}
      />
    </div>
  );
  
  // Main render
  return (
    <AccessibleLayout>
      <main className="min-h-screen py-8">
        {currentView === 'welcome' && renderWelcome()}
        {currentView === 'activity' && renderActivity()}
        {currentView === 'break' && renderBreak()}
      </main>
      
      {/* Transition support system for demo purposes */}
      <TransitionSupportSystem 
        currentActivity="Current Activity"
        nextActivity="Dragon Speech Quest"
        countdownSeconds={5}
      />
      
      {/* Therapist controls */}
      <TherapistControls position="right" />
    </AccessibleLayout>
  );
}
