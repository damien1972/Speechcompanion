# Speech Therapy Companion Application - Technical Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (iPad/Browser)                     │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   React UI   │  │  Client-side │  │  Service Worker        │  │
│  │  Components  │  │    State    │  │  (Offline Support)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│          │               │                     │                 │
│          └───────────────┼─────────────────────┘                 │
│                          │                                       │
└──────────────────────────┼───────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Next.js Application                        │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  App Router  │  │   Server    │  │      API Routes        │  │
│  │             │  │ Components  │  │                         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Vercel Platform                            │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │ Serverless  │  │    Edge     │  │   Vercel    │  │ Vercel  │ │
│  │ Functions   │  │  Functions  │  │     KV      │  │ Postgres│ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      External Services                           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  OpenAI API  │  │  Supabase   │  │      Other APIs        │  │
│  │             │  │  (Optional) │  │                         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Core Application Shell
- **AppShell**: Main application container
  - **AuthProvider**: Authentication context and logic
  - **ThemeProvider**: Custom theming with accessibility features
  - **StateProvider**: Global application state
  - **NavigationManager**: Handles routing and navigation
  - **AccessibilityManager**: Manages accessibility settings

### Therapy Session Module
- **SessionManager**: Controls session flow and timing
  - **SessionTimer**: Visual timer component
  - **ActivitySequencer**: Manages activity order and transitions
  - **SessionRecorder**: Handles data collection and recording
  - **ProgressTracker**: Tracks achievements and progress

### Activity Modules (Pluggable Components)
- **ActivityBase**: Base component for all activities
  - **DragonSpeechQuest**: Speech practice activities
  - **DragonExpertRolePlay**: Role-play module
  - **PronunciationGame**: Speech recording and assessment
  - **BehaviorMomentumBuilder**: Quick success activities
  - **DragonDenReset**: Calming space component

### AI Integration Layer
- **AIManager**: Manages OpenAI API communication
  - **PromptEngine**: Handles prompt construction and management
  - **ContentGenerator**: Generates therapeutic content
  - **SpeechAnalyzer**: Processes speech recordings
  - **AdaptationEngine**: Adjusts difficulty and content

### Data Persistence Layer
- **StorageManager**: Manages data across storage types
  - **SessionStorage**: Handles current session data
  - **ProgressStorage**: Manages long-term progress data
  - **SettingsStorage**: Stores configuration and preferences
  - **MediaStorage**: Manages speech recordings and media

### Therapist Control Panel
- **ControlPanel**: Main therapist interface
  - **QuickControls**: Immediate intervention tools
  - **SettingsPanel**: Configuration options
  - **DataViewer**: Session data and analytics
  - **ActivityControls**: Activity management tools

## Data Flow Architecture

### Session Initialization Flow
```
Therapist Login → Patient Selection → Session Configuration → Activity Selection → Session Start
```

### Activity Execution Flow
```
Activity Load → Instruction Presentation → User Interaction → Performance Assessment → Reward Delivery → Progress Update
```

### Speech Assessment Flow
```
Audio Recording → Signal Processing → OpenAI Whisper API → Assessment Analysis → Feedback Generation → Progress Update
```

### Reward System Flow
```
Performance Evaluation → Reward Selection → Animation Rendering → Token Update → Progress Visualization
```

## API Integration Architecture

### OpenAI API Integration
- **Text Generation Endpoints**
  - Content generation for activities
  - Instruction simplification
  - Narrative creation
  - Reward personalization
- **Whisper API Endpoints**
  - Speech recognition
  - Pronunciation assessment
  - Phonological pattern analysis

### Database Schema (Vercel KV/Postgres)
- **Therapist Profiles**
  - Authentication information
  - Preferences and settings
- **Patient Profiles**
  - Personal information
  - Interests and preferences
  - Speech goals and targets
- **Session Records**
  - Activity sequence
  - Performance data
  - Speech recordings (references)
  - Achievement records
- **Progress Data**
  - Long-term tracking
  - Goal achievement
  - Trend analysis

## Deployment Architecture

### Vercel Deployment Strategy
- **Production Environment**
  - Main application deployment
  - Stable release version
- **Preview Environment**
  - Feature testing
  - Therapist review
- **Development Environment**
  - Active development
  - Integration testing

### Edge Function Implementation
- **Latency-Critical Operations**
  - Session timer synchronization
  - Quick engagement interventions
  - Initial audio processing
  - Token economy updates

### Serverless Function Implementation
- **Computation-Heavy Operations**
  - OpenAI API integration
  - Speech analysis
  - Report generation
  - Data processing

## Security Architecture

### Authentication Flow
- NextAuth.js implementation
- Role-based access control
- Secure session management

### Data Protection
- End-to-end encryption for sensitive data
- Secure storage of speech samples
- Compliance with healthcare privacy standards

### API Security
- Rate limiting
- Request validation
- Secure key management

## Offline Capability Architecture

### Service Worker Implementation
- Offline-first data strategy
- Core functionality without network
- Synchronization upon reconnection

### Local Storage Strategy
- IndexedDB for session data
- Local caching of essential assets
- Offline activity support

## Performance Optimization Architecture

### Asset Delivery Strategy
- Image optimization via Next.js
- Code splitting and lazy loading
- Edge caching for static assets

### Rendering Strategy
- Server components for data-heavy operations
- Client components for interactive elements
- Streaming for AI-generated content

### Monitoring Strategy
- Core Web Vitals tracking
- Custom event monitoring
- Error tracking and reporting