// Application Constants

// Theme Constants
export const THEME = {
  COLORS: {
    PRIMARY: '#FF69B4', // Hot Pink
    SECONDARY: '#9370DB', // Medium Purple
    ACCENT: '#FFD700', // Gold
    BACKGROUND: '#FFFFFF', // White
    TEXT: '#333333', // Dark Gray
    SUCCESS: '#4CAF50', // Green
    WARNING: '#FF9800', // Orange
    ERROR: '#F44336', // Red
    DRAGON_PRIMARY: '#FF69B4', // Pink Dragon
    DRAGON_SECONDARY: '#9370DB', // Purple Dragon
    DRAGON_TERTIARY: '#FFFFFF', // White Dragon
  },
  FONTS: {
    PRIMARY: 'OpenDyslexic, Arial, sans-serif',
    HEADING: 'OpenDyslexic, Arial, sans-serif',
    BODY: 'OpenDyslexic, Arial, sans-serif',
  },
  SIZES: {
    FONT_SMALL: '16px',
    FONT_MEDIUM: '18px',
    FONT_LARGE: '20px',
    FONT_XLARGE: '24px',
    FONT_XXLARGE: '32px',
    SPACING_SMALL: '8px',
    SPACING_MEDIUM: '16px',
    SPACING_LARGE: '24px',
    SPACING_XLARGE: '32px',
    BORDER_RADIUS: '12px',
    TOUCH_TARGET: '44px',
  },
  ANIMATIONS: {
    DURATION_SLOW: '0.5s',
    DURATION_MEDIUM: '0.3s',
    DURATION_FAST: '0.2s',
    EASING: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Session Constants
export const SESSION = {
  DEFAULT_DURATION: 45, // minutes
  MIN_DURATION: 15, // minutes
  MAX_DURATION: 60, // minutes
  DEFAULT_BREAK_DURATION: 60, // seconds
  MIN_BREAK_DURATION: 30, // seconds
  MAX_BREAK_DURATION: 120, // seconds
  DEFAULT_ACTIVITY_DURATION: 10, // minutes
  MIN_ACTIVITY_DURATION: 5, // minutes
  MAX_ACTIVITY_DURATION: 15, // minutes
  TRANSITION_WARNING_TIME: 30, // seconds
  END_WARNING_TIME: 120, // seconds
};

// Activity Types
export const ACTIVITY_TYPES = {
  DRAGON_SPEECH_QUEST: 'DragonSpeechQuest',
  DRAGON_EXPERT_ROLEPLAY: 'DragonExpertRolePlay',
  PRONUNCIATION_GAME: 'PronunciationGame',
  BEHAVIOR_MOMENTUM: 'BehaviorMomentumBuilder',
  DRAGONS_DEN_RESET: 'DragonsDenReset',
};

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  VERY_EASY: 1,
  EASY: 2,
  MODERATE: 3,
  CHALLENGING: 4,
  VERY_CHALLENGING: 5,
};

// Token Economy Constants
export const TOKEN_ECONOMY = {
  DEFAULT_INCREMENT: 1,
  QUICK_INCREMENTS: [1, 2, 5],
  BONUS_TOKEN_PROBABILITY: 0.1, // 10% chance of bonus token opportunity
  TOKEN_CATEGORIES: {
    SPEECH_PRODUCTION: 'speech_production',
    ENGAGEMENT: 'engagement',
    BEHAVIOR: 'behavior',
    ACHIEVEMENT: 'achievement',
    REWARD_REDEMPTION: 'reward_redemption',
  },
};

// Speech Assessment Constants
export const SPEECH_ASSESSMENT = {
  CLARITY_LEVELS: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
  },
  SUCCESS_THRESHOLD: 0.7, // 70% accuracy for success
  MASTERY_THRESHOLD: 0.9, // 90% accuracy for mastery
  RECORDING_MAX_DURATION: 10, // seconds
};

// AI Integration Constants
export const AI_INTEGRATION = {
  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_MAX_TOKENS: 150,
  CONTENT_COMPLEXITY_LEVELS: {
    VERY_SIMPLE: 1,
    SIMPLE: 2,
    MODERATE: 3,
    COMPLEX: 4,
    VERY_COMPLEX: 5,
  },
  CATEGORIES: {
    CONTENT_GENERATION: 'content_generation',
    SPEECH_ASSESSMENT: 'speech_assessment',
    REWARD_PERSONALIZATION: 'reward_personalization',
    ADAPTATION: 'adaptation',
  },
};

// Accessibility Constants
export const ACCESSIBILITY = {
  TEXT_SIZES: {
    STANDARD: 'standard',
    LARGE: 'large',
    EXTRA_LARGE: 'extra_large',
  },
  ANIMATION_SPEEDS: {
    SLOW: 'slow',
    NORMAL: 'normal',
    FAST: 'fast',
  },
  VISUAL_COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
  },
};

// Patient Default Profile (for the specific 12yo girl with Down syndrome)
export const DEFAULT_PATIENT_PROFILE = {
  name: 'Patient',
  age: 12,
  cognitiveProfile: {
    diagnosis: 'Down syndrome',
    cognitiveLevel: 55, // IQ 55
    attentionSpan: 'medium',
    processingSpeed: 'slow',
  },
  preferences: {
    interests: ['dragons', 'dinosaurs'],
    colors: ['pink', 'purple', 'white'],
    characters: ['Sparkle', 'Amethyst', 'Snowflake'],
    rewardTypes: ['visual', 'collection', 'story'],
  },
  speechGoals: {
    targetSounds: ['s', 'r', 'l', 'th', 'ch'],
    targetPatterns: ['initial consonant deletion', 'final consonant deletion', 'cluster reduction'],
    intelligibilityLevel: 3,
    currentFocus: ['s', 'initial consonant deletion'],
  },
  behavioralConsiderations: {
    triggers: ['loud noises', 'complex instructions', 'long waiting periods'],
    calmingStrategies: ['deep breathing', 'visual schedules', 'favorite characters'],
    reinforcers: ['dragon characters', 'collecting items', 'praise'],
    transitionDifficulty: 'moderate',
  },
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  PATIENT_PROFILE: '/patients/[id]',
  SESSION: '/session/[id]',
  ACTIVITIES: '/activities',
  REPORTS: '/reports',
  SETTINGS: '/settings',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'speech_therapy_auth_token',
  USER_PROFILE: 'speech_therapy_user_profile',
  CURRENT_SESSION: 'speech_therapy_current_session',
  SETTINGS: 'speech_therapy_settings',
  THEME: 'speech_therapy_theme',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    SESSION: '/api/auth/session',
  },
  THERAPISTS: {
    GET: '/api/therapists/[id]',
    UPDATE: '/api/therapists/[id]',
    PATIENTS: '/api/therapists/[id]/patients',
    SESSIONS: '/api/therapists/[id]/sessions',
  },
  PATIENTS: {
    LIST: '/api/patients',
    CREATE: '/api/patients',
    GET: '/api/patients/[id]',
    UPDATE: '/api/patients/[id]',
    DELETE: '/api/patients/[id]',
    SESSIONS: '/api/patients/[id]/sessions',
    PROGRESS: '/api/patients/[id]/progress',
    SPEECH_SAMPLES: '/api/patients/[id]/speech-samples',
    REWARDS: '/api/patients/[id]/rewards',
    TOKENS: '/api/patients/[id]/tokens',
  },
  SESSIONS: {
    LIST: '/api/sessions',
    CREATE: '/api/sessions',
    GET: '/api/sessions/[id]',
    UPDATE: '/api/sessions/[id]',
    DELETE: '/api/sessions/[id]',
    START: '/api/sessions/[id]/start',
    END: '/api/sessions/[id]/end',
    ACTIVITIES: '/api/sessions/[id]/activities',
    BREAKS: '/api/sessions/[id]/breaks',
    INTERVENTIONS: '/api/sessions/[id]/interventions',
    ACHIEVEMENTS: '/api/sessions/[id]/achievements',
    REPORT: '/api/sessions/[id]/report',
  },
  ACTIVITIES: {
    LIST: '/api/activities',
    GET: '/api/activities/[id]',
    UPDATE: '/api/activities/[id]',
    START: '/api/activities/[id]/start',
    END: '/api/activities/[id]/end',
    TOKENS: '/api/activities/[id]/tokens',
    SPEECH_SAMPLES: '/api/activities/[id]/speech-samples',
  },
  SPEECH: {
    RECORD: '/api/speech/record',
    ANALYZE: '/api/speech/analyze',
    SAMPLES: '/api/speech/samples/[id]',
    PROGRESS: '/api/speech/progress/[patientId]',
  },
  AI: {
    GENERATE_CONTENT: '/api/ai/generate-content',
    ASSESS_SPEECH: '/api/ai/assess-speech',
    PERSONALIZE_REWARD: '/api/ai/personalize-reward',
    ADAPT_SESSION: '/api/ai/adapt-session',
    PROMPT_TEMPLATES: '/api/ai/prompt-templates',
    USAGE: '/api/ai/usage',
  },
  TOKENS: {
    GET: '/api/tokens/[patientId]',
    AWARD: '/api/tokens/award',
    REDEEM: '/api/tokens/redeem',
    TRANSACTIONS: '/api/tokens/transactions/[patientId]',
  },
  REWARDS: {
    GET: '/api/rewards/[patientId]',
    UNLOCK: '/api/rewards/unlock',
  },
  SETTINGS: {
    GET: '/api/settings/[patientId]',
    UPDATE: '/api/settings/[patientId]',
    RESET: '/api/settings/reset',
  },
  ANALYTICS: {
    ENGAGEMENT: '/api/analytics/engagement/[patientId]',
    SPEECH: '/api/analytics/speech/[patientId]',
    SESSIONS: '/api/analytics/sessions/[patientId]',
    INTERVENTIONS: '/api/analytics/interventions/[patientId]',
    EXPORT: '/api/analytics/export/[patientId]',
  },
};