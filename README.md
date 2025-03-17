# Speech Therapy Companion Application

A specialized speech therapy application designed for a 12-year-old girl with Down syndrome (IQ 55), featuring a dragon theme and comprehensive accessibility features.

## Features

- **Visual Session Timer**: Dragon-themed timer with visual progress indicators
- **Behavior Momentum Builder**: Re-engagement system for maintaining attention
- **Dragon's Den Reset Space**: Calming area for breaks with breathing exercises
- **Dragon-Themed Speech Activities**: Interactive speech practice with dragon characters
- **Token Economy Visualizer**: Visual reward system with collectible tokens
- **Transition Support System**: Visual aids for activity transitions
- **Real-Time Therapist Controls**: Interface for therapists to manage sessions

## Accessibility Features

- **Simplified Visual Hierarchy**: Clear, consistent layout with visual cues
- **Large Text**: 18-20px base font size with options for larger text
- **Simple Sentences**: 5-7 words per sentence with concrete vocabulary
- **High Contrast Mode**: Enhanced visual contrast for better readability
- **Reduced Motion**: Option to minimize animations for users with sensory sensitivities
- **Large Touch Targets**: Easily tappable buttons and interactive elements

## Technical Implementation

- **React 18 with Next.js 14**: Modern frontend framework
- **TypeScript**: Type-safe code for better reliability
- **Context API**: Session and accessibility state management
- **Framer Motion**: Accessible animations with reduced motion support
- **Tailwind CSS**: Responsive styling with accessibility considerations
- **Local Storage**: Session persistence for uninterrupted therapy

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This application is optimized for deployment on Vercel:

```
npm run build
```

## Components

- **AccessibleText**: Text component with adaptive sizing
- **AccessibleButton**: Button component with high contrast and reduced motion support
- **AccessibleCard**: Card component with simplified visual options
- **AccessibleAnimation**: Animation component that respects reduced motion preferences
- **DragonsDenReset**: Calming space with breathing exercises
- **TokenEconomyVisualizer**: Visual token collection system
- **TransitionSupportSystem**: Visual transition support between activities
- **TherapistControls**: Interface for therapists to manage sessions
- **DragonSpeechQuest**: Interactive speech practice activity
- **VisualSessionTimer**: Dragon-themed visual timer

## Context Providers

- **SessionProvider**: Manages therapy session state
- **AccessibilityProvider**: Manages accessibility preferences

## License

This project is licensed under the MIT License.
