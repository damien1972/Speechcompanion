# Data Models and Schemas

## User Models

### TherapistProfile
```typescript
interface TherapistProfile {
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
```

### PatientProfile
```typescript
interface PatientProfile {
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
```

## Session Models

### TherapySession
```typescript
interface TherapySession {
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
```

### ActivityRecord
```typescript
interface ActivityRecord {
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
```

### BreakRecord
```typescript
interface BreakRecord {
  id: string;
  sessionId: string;
  startTime: Date;
  endTime: Date | null;
  duration: number; // in seconds
  breakType: 'scheduled' | 'requested' | 'emergency';
  effectiveness: number; // scale 1-5
  notes: string;
}
```

### Intervention
```typescript
interface Intervention {
  id: string;
  activityId: string;
  interventionType: 'attention' | 'motivation' | 'difficulty' | 'reset';
  timestamp: Date;
  effectiveness: number; // scale 1-5
  notes: string;
}
```

### Achievement
```typescript
interface Achievement {
  id: string;
  sessionId: string;
  achievementType: 'sound_mastery' | 'pattern_improvement' | 'engagement' | 'milestone';
  description: string;
  timestamp: Date;
  rewardGiven: string;
  notes: string;
}
```

### SpeechSample
```typescript
interface SpeechSample {
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
```

## Progress Models

### ProgressRecord
```typescript
interface ProgressRecord {
  id: string;
  patientId: string;
  period: 'weekly' | 'monthly' | 'quarterly';
  startDate: Date;
  endDate: Date;
  sessionsCompleted: number;
  totalSessionDuration: number; // in minutes
  averageEngagement: number; // scale 1-5
  soundProgress: {
    [sound: string]: {
      initialAccuracy: number; // percentage
      currentAccuracy: number; // percentage
      sessionsTargeted: number;
      status: 'not_started' | 'in_progress' | 'mastered';
    };
  };
  patternProgress: {
    [pattern: string]: {
      initialFrequency: number; // percentage
      currentFrequency: number; // percentage
      sessionsTargeted: number;
      status: 'not_started' | 'in_progress' | 'resolved';
    };
  };
  intelligibilityProgress: {
    initial: number; // scale 1-5
    current: number; // scale 1-5
    change: number; // percentage change
  };
  achievements: string[]; // references to Achievement ids
  recommendations: string;
  nextSteps: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## AI Integration Models

### AIPromptTemplate
```typescript
interface AIPromptTemplate {
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
```

### AIGeneratedContent
```typescript
interface AIGeneratedContent {
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
```

### SpeechAssessmentResult
```typescript
interface SpeechAssessmentResult {
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
```

## Token Economy Models

### TokenBalance
```typescript
interface TokenBalance {
  id: string;
  patientId: string;
  currentBalance: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
  updatedAt: Date;
}
```

### TokenTransaction
```typescript
interface TokenTransaction {
  id: string;
  patientId: string;
  sessionId: string | null;
  activityId: string | null;
  amount: number; // positive for earned, negative for spent
  reason: string;
  category: 'speech_production' | 'engagement' | 'behavior' | 'achievement' | 'reward_redemption';
  timestamp: Date;
}
```

### Reward
```typescript
interface Reward {
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
```

## Settings and Configuration Models

### ApplicationSettings
```typescript
interface ApplicationSettings {
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
```

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/login` - Therapist login
- `POST /api/auth/logout` - Therapist logout
- `GET /api/auth/session` - Get current session
- `POST /api/auth/reset-password` - Password reset

### Therapist Endpoints
- `GET /api/therapists/:id` - Get therapist profile
- `PUT /api/therapists/:id` - Update therapist profile
- `GET /api/therapists/:id/patients` - Get therapist's patients
- `GET /api/therapists/:id/sessions` - Get therapist's sessions

### Patient Endpoints
- `GET /api/patients` - List all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient profile
- `PUT /api/patients/:id` - Update patient profile
- `DELETE /api/patients/:id` - Delete patient
- `GET /api/patients/:id/sessions` - Get patient's sessions
- `GET /api/patients/:id/progress` - Get patient's progress
- `GET /api/patients/:id/speech-samples` - Get patient's speech samples
- `GET /api/patients/:id/rewards` - Get patient's rewards
- `GET /api/patients/:id/tokens` - Get patient's token balance

### Session Endpoints
- `GET /api/sessions` - List sessions
- `POST /api/sessions` - Create new session
- `GET /api/sessions/:id` - Get session details
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session
- `POST /api/sessions/:id/start` - Start session
- `POST /api/sessions/:id/end` - End session
- `POST /api/sessions/:id/activities` - Add activity to session
- `POST /api/sessions/:id/breaks` - Add break to session
- `POST /api/sessions/:id/interventions` - Record intervention
- `POST /api/sessions/:id/achievements` - Record achievement
- `GET /api/sessions/:id/report` - Generate session report

### Activity Endpoints
- `GET /api/activities` - List activity types
- `GET /api/activities/:id` - Get activity details
- `PUT /api/activities/:id` - Update activity record
- `POST /api/activities/:id/start` - Start activity
- `POST /api/activities/:id/end` - End activity
- `POST /api/activities/:id/tokens` - Award tokens
- `POST /api/activities/:id/speech-samples` - Record speech sample

### Speech Analysis Endpoints
- `POST /api/speech/record` - Record speech sample
- `POST /api/speech/analyze` - Analyze speech sample
- `GET /api/speech/samples/:id` - Get speech sample
- `GET /api/speech/progress/:patientId` - Get speech progress

### AI Integration Endpoints
- `POST /api/ai/generate-content` - Generate therapeutic content
- `POST /api/ai/assess-speech` - Assess speech recording
- `POST /api/ai/personalize-reward` - Generate personalized reward
- `POST /api/ai/adapt-session` - Get session adaptation recommendations
- `GET /api/ai/prompt-templates` - List available prompt templates
- `POST /api/ai/prompt-templates` - Create new prompt template
- `GET /api/ai/usage` - Get AI API usage statistics

### Token Economy Endpoints
- `GET /api/tokens/:patientId` - Get token balance
- `POST /api/tokens/award` - Award tokens
- `POST /api/tokens/redeem` - Redeem tokens for reward
- `GET /api/tokens/transactions/:patientId` - Get token transactions
- `GET /api/rewards/:patientId` - Get available rewards
- `POST /api/rewards/unlock` - Unlock reward

### Settings Endpoints
- `GET /api/settings/:patientId` - Get application settings
- `PUT /api/settings/:patientId` - Update application settings
- `POST /api/settings/reset` - Reset to default settings

### Analytics Endpoints
- `GET /api/analytics/engagement/:patientId` - Get engagement analytics
- `GET /api/analytics/speech/:patientId` - Get speech progress analytics
- `GET /api/analytics/sessions/:patientId` - Get session analytics
- `GET /api/analytics/interventions/:patientId` - Get intervention effectiveness
- `GET /api/analytics/export/:patientId` - Export analytics data