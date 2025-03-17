// Core Types for Speech Therapy Companion Application

// User Types
export interface TherapistProfile {
  id: string;
  name: string;
  email: string;
  role: 'therapist' | 'admin';
  preferences: {
    defaultSessionDuration: number; // in minutes
    defaultBreakDuration: number; // in seconds
    uiSettings: {
      controlPanelPosition: 'left' | 'right' | 'bottom';
      controlPanelCollapsed: boolean;
      showAdvancedControls: boolean;
    };
    notificationSettings: {
      sessionEndWarning: boolean;
      activityTransitionWarning: boolean;
      engagementAlerts: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  cognitiveProfile: {
    diagnosis: string; // e.g., "Down syndrome"
    cognitiveLevel: number; // e.g., IQ 55
    attentionSpan: 'short' | 'medium' | 'long';
    processingSpeed: 'slow' | 'moderate' | 'quick';
  };
  preferences: {
    interests: string[]; // e.g., ["dragons", "dinosaurs"]
    colors: string[]; // e.g., ["pink", "purple", "white"]
    characters: string[]; // e.g., specific dragon characters
    rewardTypes: string[]; // e.g., ["visual", "auditory", "collection"]
  };
  speechGoals: {
    targetSounds: string[]; // e.g., ["s", "r", "l"]
    targetPatterns: string[]; // e.g., ["initial consonant deletion"]
    intelligibilityLevel: number; // scale 1-5
    currentFocus: string[]; // current therapy focus
  };
  behavioralConsiderations: {
    triggers: string[]; // things that may cause disengagement
    calmingStrategies: string[]; // effective strategies
    reinforcers: string[]; // effective reinforcers
    transitionDifficulty: 'low' | 'moderate' | 'high';
  };
  createdAt: Date;
  updatedAt: Date;
}

// Session Types
export interface TherapySession {
  id: string;
  patientId: string;
  therapistId: string;
  date: Date;
  duration: number; // planned duration in minutes
  actualDuration: number; // actual duration in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  activities: ActivityRecord[];
  breaks: BreakRecord[];
  overallEngagement: number; // scale 1-5
  notes: string;
  achievements: Achievement[];
  tokensEarned: number;
  speechSamples: SpeechSample[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityRecord {
  id: string;
  sessionId: string;
  activityType: string; // e.g., "DragonSpeechQuest"
  startTime: Date;
  endTime: Date | null;
  duration: number; // in seconds
  difficulty: number; // scale 1-5
  targetSounds: string[];
  targetPatterns: string[];
  engagementLevel: number; // scale 1-5
  successRate: number; // percentage
  tokensEarned: number;
  interventionsUsed: Intervention[];
  aiContentUsed: boolean;
  speechSamples: string[]; // references to SpeechSample ids
  notes: string;
}

export interface BreakRecord {
  id: string;
  sessionId: string;
  startTime: Date;
  endTime: Date | null;
  duration: number; // in seconds
  breakType: 'scheduled' | 'requested' | 'emergency';
  effectiveness: number; // scale 1-5
  notes: string;
}

export interface Intervention {
  id: string;
  activityId: string;
  interventionType: 'attention' | 'motivation' | 'difficulty' | 'reset';
  timestamp: Date;
  effectiveness: number; // scale 1-5
  notes: string;
}

export interface Achievement {
  id: string;
  sessionId: string;
  achievementType: 'sound_mastery' | 'pattern_improvement' | 'engagement' | 'milestone';
  description: string;
  timestamp: Date;
  rewardGiven: string;
  notes: string;
}

export interface SpeechSample {
  id: string;
  sessionId: string;
  activityId: string;
  targetSound: string;
  targetWord: string;
  recordingUrl: string;
  transcription: string;
  aiAssessment: {
    recognized: boolean;
    clarity: number; // scale 1-3
    targetSoundAccuracy: number; // percentage
    notes: string;
  };
  therapistAssessment: {
    clarity: number; // scale 1-3
    targetSoundAccuracy: number; // percentage
    notes: string;
  };
  timestamp: Date;
}

// Token Economy Types
export interface TokenBalance {
  id: string;
  patientId: string;
  currentBalance: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
  updatedAt: Date;
}

export interface TokenTransaction {
  id: string;
  patientId: string;
  sessionId: string | null;
  activityId: string | null;
  amount: number; // positive for earned, negative for spent
  reason: string;
  category: 'speech_production' | 'engagement' | 'behavior' | 'achievement' | 'reward_redemption';
  timestamp: Date;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  category: 'dragon_character' | 'environment' | 'ability' | 'accessory' | 'story';
  tokenCost: number;
  visualAsset: string; // path to image
  unlockCriteria: {
    tokensRequired: number;
    achievementsRequired: string[];
    soundsMastered: string[];
    sessionsCompleted: number;
  };
  isUnlocked: boolean;
  patientId: string;
  unlockedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Settings Types
export interface ApplicationSettings {
  id: string;
  patientId: string;
  accessibility: {
    textSize: 'standard' | 'large' | 'extra_large';
    highContrast: boolean;
    reducedMotion: boolean;
    audioVolume: number; // 0-100
    hapticFeedback: boolean;
    simplifiedVisuals: boolean;
  };
  therapistControls: {
    controlPanelPosition: 'left' | 'right' | 'bottom';
    quickAccessFeatures: string[];
    dataDisplayPreferences: {
      showTimer: boolean;
      showTokens: boolean;
      showProgress: boolean;
    };
  };
  aiSettings: {
    contentGenerationEnabled: boolean;
    speechAssessmentEnabled: boolean;
    adaptationEnabled: boolean;
    contentComplexityLevel: number; // scale 1-5
    responseSpeed: 'standard' | 'optimized';
  };
  sessionDefaults: {
    sessionDuration: number; // in minutes
    activityDuration: number; // in minutes
    breakFrequency: number; // activities between breaks
    breakDuration: number; // in seconds
  };
  updatedAt: Date;
}

// AI Integration Types
export interface AIPromptTemplate {
  id: string;
  name: string;
  description: string;
  category: 'content_generation' | 'speech_assessment' | 'reward_personalization' | 'adaptation';
  systemPrompt: string;
  userPromptTemplate: string;
  parameters: {
    name: string;
    description: string;
    type: 'string' | 'number' | 'boolean' | 'array';
    required: boolean;
    defaultValue?: any;
  }[];
  responseFormat: string;
  maxTokens: number;
  temperature: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIGeneratedContent {
  id: string;
  promptTemplateId: string;
  sessionId: string | null;
  activityId: string | null;
  patientId: string;
  parameters: Record<string, any>;
  prompt: string;
  response: string;
  tokensUsed: number;
  generationTime: number; // in milliseconds
  usageContext: string;
  effectiveness: number | null; // scale 1-5, rated by therapist
  cached: boolean;
  createdAt: Date;
}

export interface SpeechAssessmentResult {
  id: string;
  speechSampleId: string;
  modelVersion: string;
  transcription: string;
  confidence: number; // percentage
  targetRecognized: boolean;
  phonemeAnalysis: {
    [phoneme: string]: {
      expected: boolean;
      detected: boolean;
      confidence: number; // percentage
      position: 'initial' | 'medial' | 'final';
    };
  };
  overallClarity: number; // scale 1-3
  processingTime: number; // in milliseconds
  createdAt: Date;
}

// Activity Types
export interface ActivityConfig {
  id: string;
  name: string;
  description: string;
  type: string;
  difficulty: number;
  targetAgeRange: [number, number];
  targetCognitiveLevel: [number, number];
  duration: number; // in minutes
  requiredResources: string[];
  instructions: string;
  visualSupports: string[];
  adaptationOptions: {
    simplification: string[];
    extension: string[];
    support: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Theme Types
export interface ThemeConfig {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  fontFamily: string;
  borderRadius: number;
  animations: {
    speed: 'slow' | 'normal' | 'fast';
    complexity: 'simple' | 'moderate' | 'complex';
  };
  createdAt: Date;
  updatedAt: Date;
}
