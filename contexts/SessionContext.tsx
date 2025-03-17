// Session Context for Speech Therapy Companion

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { TherapySession, ActivityRecord, BreakRecord, Intervention, Achievement, SpeechSample } from '../lib/types';
import { STORAGE_KEYS, SESSION } from '../lib/constants';
import { getFromStorage, saveToStorage, generateId } from '../lib/utils';

// Define the shape of the session context
export interface SessionContextType {
  currentSession: TherapySession | null;
  isSessionActive: boolean;
  currentActivity: ActivityRecord | null;
  isOnBreak: boolean;
  elapsedTime: number; // in seconds
  remainingTime: number; // in seconds
  startSession: (patientId: string, therapistId: string, plannedDuration?: number) => void;
  endSession: () => void;
  startActivity: (activityType: string, targetSounds: string[], targetPatterns: string[], difficulty: number) => void;
  endActivity: (engagementLevel: number, successRate: number, tokensEarned: number, notes?: string) => void;
  startBreak: (breakType: 'scheduled' | 'requested' | 'emergency') => void;
  endBreak: (effectiveness: number, notes?: string) => void;
  recordIntervention: (interventionType: 'attention' | 'motivation' | 'difficulty' | 'reset', effectiveness: number, notes?: string) => void;
  recordAchievement: (achievementType: 'sound_mastery' | 'pattern_improvement' | 'engagement' | 'milestone', description: string, rewardGiven: string, notes?: string) => void;
  recordSpeechSample: (targetSound: string, targetWord: string, recordingUrl: string, transcription: string, aiAssessment: SpeechSample['aiAssessment'], therapistAssessment?: SpeechSample['therapistAssessment']) => void;
  updateSessionNotes: (notes: string) => void;
}

// Create the session context
export const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Props for the SessionProvider component
interface SessionProviderProps {
  children: ReactNode;
}

// SessionProvider component
export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [currentSession, setCurrentSession] = useState<TherapySession | null>(null);
  const [currentActivity, setCurrentActivity] = useState<ActivityRecord | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedSession = getFromStorage<TherapySession>(STORAGE_KEYS.CURRENT_SESSION);
    
    if (storedSession && storedSession.status === 'in-progress') {
      setCurrentSession(storedSession);
      
      // Find current activity if there is one
      const lastActivity = storedSession.activities[storedSession.activities.length - 1];
      if (lastActivity && !lastActivity.endTime) {
        setCurrentActivity(lastActivity);
      }
      
      // Calculate elapsed time
      const sessionStartTime = new Date(storedSession.date).getTime();
      const currentTime = new Date().getTime();
      const elapsed = Math.floor((currentTime - sessionStartTime) / 1000);
      setElapsedTime(elapsed);
    }
  }, []);

  // Start timer when session becomes active
  useEffect(() => {
    if (currentSession?.status === 'in-progress' && !timerInterval) {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      
      setTimerInterval(interval);
    }
    
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [currentSession, timerInterval]);

  // Save session to storage whenever it changes
  useEffect(() => {
    if (currentSession) {
      saveToStorage(STORAGE_KEYS.CURRENT_SESSION, currentSession);
    }
  }, [currentSession]);

  // Start a new therapy session
  const startSession = (patientId: string, therapistId: string, plannedDuration: number = SESSION.DEFAULT_DURATION) => {
    const newSession: TherapySession = {
      id: generateId(),
      patientId,
      therapistId,
      date: new Date(),
      duration: plannedDuration,
      actualDuration: 0,
      status: 'in-progress',
      activities: [],
      breaks: [],
      overallEngagement: 0,
      notes: '',
      achievements: [],
      tokensEarned: 0,
      speechSamples: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setCurrentSession(newSession);
    setElapsedTime(0);
  };

  // End the current therapy session
  const endSession = () => {
    if (currentSession) {
      // End current activity if there is one
      if (currentActivity) {
        endActivity(3, 0, 0, 'Session ended before activity completion');
      }
      
      const updatedSession: TherapySession = {
        ...currentSession,
        status: 'completed',
        actualDuration: Math.floor(elapsedTime / 60),
        updatedAt: new Date(),
      };
      
      setCurrentSession(updatedSession);
      setCurrentActivity(null);
      
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  };

  // Start a new activity
  const startActivity = (activityType: string, targetSounds: string[], targetPatterns: string[], difficulty: number) => {
    if (currentSession) {
      // End current activity if there is one
      if (currentActivity) {
        endActivity(3, 0, 0, 'Activity ended before completion to start new activity');
      }
      
      const newActivity: ActivityRecord = {
        id: generateId(),
        sessionId: currentSession.id,
        activityType,
        startTime: new Date(),
        endTime: null,
        duration: 0,
        difficulty,
        targetSounds,
        targetPatterns,
        engagementLevel: 0,
        successRate: 0,
        tokensEarned: 0,
        interventionsUsed: [],
        aiContentUsed: false,
        speechSamples: [],
        notes: '',
      };
      
      const updatedSession: TherapySession = {
        ...currentSession,
        activities: [...currentSession.activities, newActivity],
        updatedAt: new Date(),
      };
      
      setCurrentActivity(newActivity);
      setCurrentSession(updatedSession);
    }
  };

  // End the current activity
  const endActivity = (engagementLevel: number, successRate: number, tokensEarned: number, notes?: string) => {
    if (currentSession && currentActivity) {
      const endTime = new Date();
      const startTime = new Date(currentActivity.startTime);
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      
      const updatedActivity: ActivityRecord = {
        ...currentActivity,
        endTime,
        duration,
        engagementLevel,
        successRate,
        tokensEarned,
        notes: notes || currentActivity.notes,
      };
      
      const updatedActivities = currentSession.activities.map(activity => 
        activity.id === currentActivity.id ? updatedActivity : activity
      );
      
      const updatedSession: TherapySession = {
        ...currentSession,
        activities: updatedActivities,
        tokensEarned: currentSession.tokensEarned + tokensEarned,
        updatedAt: new Date(),
      };
      
      setCurrentActivity(null);
      setCurrentSession(updatedSession);
    }
  };

  // Start a break
  const startBreak = (breakType: 'scheduled' | 'requested' | 'emergency') => {
    if (currentSession) {
      // End current activity if there is one
      if (currentActivity) {
        endActivity(3, 0, 0, 'Activity paused for break');
      }
      
      const newBreak: BreakRecord = {
        id: generateId(),
        sessionId: currentSession.id,
        startTime: new Date(),
        endTime: null,
        duration: 0,
        breakType,
        effectiveness: 0,
        notes: '',
      };
      
      const updatedSession: TherapySession = {
        ...currentSession,
        breaks: [...currentSession.breaks, newBreak],
        updatedAt: new Date(),
      };
      
      setCurrentSession(updatedSession);
    }
  };

  // End the current break
  const endBreak = (effectiveness: number, notes?: string) => {
    if (currentSession) {
      const currentBreak = currentSession.breaks[currentSession.breaks.length - 1];
      
      if (currentBreak && !currentBreak.endTime) {
        const endTime = new Date();
        const startTime = new Date(currentBreak.startTime);
        const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
        
        const updatedBreak: BreakRecord = {
          ...currentBreak,
          endTime,
          duration,
          effectiveness,
          notes: notes || currentBreak.notes,
        };
        
        const updatedBreaks = currentSession.breaks.map(breakRecord => 
          breakRecord.id === currentBreak.id ? updatedBreak : breakRecord
        );
        
        const updatedSession: TherapySession = {
          ...currentSession,
          breaks: updatedBreaks,
          updatedAt: new Date(),
        };
        
        setCurrentSession(updatedSession);
      }
    }
  };

  // Record an intervention
  const recordIntervention = (interventionType: 'attention' | 'motivation' | 'difficulty' | 'reset', effectiveness: number, notes?: string) => {
    if (currentSession && currentActivity) {
      const newIntervention: Intervention = {
        id: generateId(),
        activityId: currentActivity.id,
        interventionType,
        timestamp: new Date(),
        effectiveness,
        notes: notes || '',
      };
      
      const updatedActivity: ActivityRecord = {
        ...currentActivity,
        interventionsUsed: [...currentActivity.interventionsUsed, newIntervention],
      };
      
      const updatedActivities = currentSession.activities.map(activity => 
        activity.id === currentActivity.id ? updatedActivity : activity
      );
      
      const updatedSession: TherapySession = {
        ...currentSession,
        activities: updatedActivities,
        updatedAt: new Date(),
      };
      
      setCurrentActivity(updatedActivity);
      setCurrentSession(updatedSession);
    }
  };

  // Record an achievement
  const recordAchievement = (achievementType: 'sound_mastery' | 'pattern_improvement' | 'engagement' | 'milestone', description: string, rewardGiven: string, notes?: string) => {
    if (currentSession) {
      const newAchievement: Achievement = {
        id: generateId(),
        sessionId: currentSession.id,
        achievementType,
        description,
        timestamp: new Date(),
        rewardGiven,
        notes: notes || '',
      };
      
      const updatedSession: TherapySession = {
        ...currentSession,
        achievements: [...currentSession.achievements, newAchievement],
        updatedAt: new Date(),
      };
      
      setCurrentSession(updatedSession);
    }
  };

  // Record a speech sample
  const recordSpeechSample = (targetSound: string, targetWord: string, recordingUrl: string, transcription: string, aiAssessment: SpeechSample['aiAssessment'], therapistAssessment?: SpeechSample['therapistAssessment']) => {
    if (currentSession && currentActivity) {
      const newSpeechSample: SpeechSample = {
        id: generateId(),
        sessionId: currentSession.id,
        activityId: currentActivity.id,
        targetSound,
        targetWord,
        recordingUrl,
        transcription,
        aiAssessment,
        therapistAssessment: therapistAssessment || {
          clarity: 0,
          targetSoundAccuracy: 0,
          notes: '',
        },
        timestamp: new Date(),
      };
      
      const updatedSession: TherapySession = {
        ...currentSession,
        speechSamples: [...currentSession.speechSamples, newSpeechSample],
        updatedAt: new Date(),
      };
      
      const updatedActivity: ActivityRecord = {
        ...currentActivity,
        speechSamples: [...currentActivity.speechSamples, newSpeechSample.id],
      };
      
      const updatedActivities = currentSession.activities.map(activity => 
        activity.id === currentActivity.id ? updatedActivity : activity
      );
      
      const finalUpdatedSession = {
        ...updatedSession,
        activities: updatedActivities,
      };
      
      setCurrentActivity(updatedActivity);
      setCurrentSession(finalUpdatedSession);
    }
  };

  // Update session notes
  const updateSessionNotes = (notes: string) => {
    if (currentSession) {
      const updatedSession: TherapySession = {
        ...currentSession,
        notes,
        updatedAt: new Date(),
      };
      
      setCurrentSession(updatedSession);
    }
  };

  // Calculate remaining time
  const remainingTime = currentSession 
    ? Math.max(0, (currentSession.duration * 60) - elapsedTime) 
    : 0;

  // Determine if session is active
  const isSessionActive = currentSession?.status === 'in-progress';

  // Determine if on break
  const isOnBreak = currentSession?.breaks.some(breakRecord => !breakRecord.endTime) || false;

  // Context value
  const contextValue: SessionContextType = {
    currentSession,
    isSessionActive,
    currentActivity,
    isOnBreak,
    elapsedTime,
    remainingTime,
    startSession,
    endSession,
    startActivity,
    endActivity,
    startBreak,
    endBreak,
    recordIntervention,
    recordAchievement,
    recordSpeechSample,
    updateSessionNotes,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
