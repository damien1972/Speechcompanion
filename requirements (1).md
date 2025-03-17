# Speech Therapy Companion Application Requirements

## Patient Profile
- 12-year-old girl with Down syndrome (IQ 55)
- Special interests: Dragons, dinosaurs
- Color preferences: Pink, purple, white

## Core Requirements

### Technical Architecture
- Frontend: React 18 with Next.js 14 (App Router)
- UI Component Library: Material UI or Chakra UI with custom theming
- State Management: Redux Toolkit + React Context API
- Animations: Framer Motion
- Backend: Next.js API Routes + Edge Functions
- Hosting: Vercel
- Authentication: NextAuth.js (for therapist login)
- Database: Supabase or Vercel KV/Postgres
- Analytics: Vercel Analytics + Custom Events
- AI Integration: OpenAI API (GPT-4 or appropriate model)
- Media Processing: Client-side Web Audio API + Edge Functions

### Cognitive Accessibility Considerations
- Simplified visual hierarchy (3-4 options maximum)
- Large, high-contrast text (16-20px)
- Simple sentence structures (5-7 words maximum)
- Large touch targets (minimum 44×44 pixels)
- Visual simplification options
- Cognitive support features
- Sensory considerations (adjustable animations, volume controls)

### Key Features
1. **Visual Session Timer and Schedule**
   - Dragon-themed timeline with stepping stones
   - 45-minute session visualization
   - Activity highlighting and progress tracking
   - Milestone celebrations

2. **Behavior Momentum Builder**
   - Quick-launch component for rapid intervention
   - Ultra-simple dragon activities for quick success
   - Success streak counter and visual reinforcement
   - Seamless transition back to original activity

3. **Dragon's Den Reset Space**
   - Calming environment with soothing colors
   - Visual breathing guide with dragon character
   - Structured 30-60 second breaks
   - Clear transition animations

4. **Dragon Speech Quest Activities**
   - Target phonological pattern selection
   - Dragon/dinosaur themed activities
   - Visual "powering up" with successful productions
   - Audio recording and playback capability

5. **Dragon Expert Role-Play Module**
   - Role-reversal with "expert badge"
   - Tiered question complexity system
   - Points for clear explanations
   - Progressive difficulty based on success

6. **Speech Recording and Pronunciation Game**
   - Target sound/word selection
   - Listen/Practice/Record modes
   - AI-assisted pronunciation assessment
   - Dragon collection feature for mastered sounds

7. **Token Economy Visualizer**
   - Token awarding with customizable increments
   - Visual tokens as dragon eggs/gems
   - Progress visualization toward rewards
   - Celebration animations at milestones

8. **Transition Support System**
   - Visual countdown before transitions
   - Dragon/dinosaur guide character
   - Visual preview of next activity
   - Transition difficulty settings

9. **Real-Time Therapist Controls**
   - Discreet control panel with "rescue" options
   - Quick activation of attention interventions
   - Difficulty adjustment controls
   - Session timer and activity management

10. **Progress Reporting and Analytics**
    - Session summary generation
    - Visual progress tracking
    - Speech sample organization
    - Goal tracking across sessions

### OpenAI API Integration
- Constrained language generation
- Scaffolded content design
- Therapeutic content generation
- Session adaptation intelligence
- Speech assessment (using Whisper API)
- Reward system personalization

### Vercel-Specific Implementation
- Next.js framework optimization
- Serverless function optimization
- Edge functions for critical paths
- Static and dynamic asset optimization
- Data persistence strategy
- Performance monitoring and analytics
- Scaling considerations

## Development Phases
1. Core Architecture and MVP Features
2. Enhanced Features and AI Integration
3. Refinement and Advanced Features

## Testing Requirements
- Cognitive accessibility testing
- Functional testing with speech therapy professionals
- Technical testing (cross-browser, performance, security)