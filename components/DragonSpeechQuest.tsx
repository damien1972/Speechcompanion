// DragonSpeechQuest component for Speech Therapy Companion

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from '../lib/hooks';
import { useAccessibility } from '../lib/hooks';
import { AccessibleText, AccessibleButton, AccessibleCard, AccessibleAnimation, AccessibleIcon } from './index';
import { DIFFICULTY_LEVELS } from '../lib/constants';

interface DragonSpeechQuestProps {
  targetSounds?: string[];
  targetWords?: string[];
  difficulty?: number;
  onComplete?: (success: boolean, tokensEarned: number) => void;
  className?: string;
}

const DragonSpeechQuest: React.FC<DragonSpeechQuestProps> = ({
  targetSounds = ['s', 'r', 'l'],
  targetWords = ['star', 'rainbow', 'light', 'sparkle', 'dragon'],
  difficulty = DIFFICULTY_LEVELS.MODERATE,
  onComplete,
  className = '',
}) => {
  const { currentActivity, recordSpeechSample } = useSession();
  const { reducedMotion, simplifiedVisuals, highContrast } = useAccessibility();
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'success' | 'retry' | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [tokensEarned, setTokensEarned] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Current word to practice
  const currentWord = targetWords[currentWordIndex];
  
  // Determine which sound in the current word to focus on
  const getTargetSound = () => {
    for (const sound of targetSounds) {
      if (currentWord.toLowerCase().includes(sound)) {
        return sound;
      }
    }
    return targetSounds[0];
  };
  
  const targetSound = getTargetSound();
  
  // Start recording
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setRecordingUrl(null);
    setFeedback(null);
    
    // In a real app, this would use the Web Audio API and MediaRecorder
    // For this implementation, we'll simulate recording
  };
  
  // Stop recording
  const stopRecording = () => {
    setIsRecording(false);
    
    // Simulate recording URL (in a real app, this would be a blob URL)
    setRecordingUrl(`recording-${currentWord}-${Date.now()}.mp3`);
    
    // Simulate AI assessment (in a real app, this would call the speech recognition API)
    simulateAssessment();
  };
  
  // Simulate speech assessment
  const simulateAssessment = () => {
    // Increase attempts
    setAttempts(prev => prev + 1);
    
    // Simulate success based on difficulty and attempts
    // Easier difficulty = higher chance of success
    // More attempts = higher chance of success
    const successThreshold = 0.7 - (0.1 * (3 - difficulty)) + (0.1 * attempts);
    const success = Math.random() < successThreshold;
    
    // Record speech sample
    if (currentActivity) {
      recordSpeechSample(
        targetSound,
        currentWord,
        `recording-${currentWord}-${Date.now()}.mp3`,
        currentWord, // Simulated transcription
        {
          recognized: success,
          clarity: success ? 3 : 1,
          targetSoundAccuracy: success ? 90 : 40,
          notes: success ? 'Good pronunciation' : 'Needs practice',
        }
      );
    }
    
    // Set feedback
    setFeedback(success ? 'success' : 'retry');
    
    // Award tokens for success
    if (success) {
      const newTokens = Math.max(1, 3 - attempts);
      setTokensEarned(prev => prev + newTokens);
    }
  };
  
  // Move to next word
  const nextWord = () => {
    if (currentWordIndex < targetWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setAttempts(0);
      setFeedback(null);
      setRecordingUrl(null);
    } else {
      // Game complete
      setGameComplete(true);
      
      if (onComplete) {
        onComplete(true, tokensEarned);
      }
    }
  };
  
  // Recording timer effect
  useEffect(() => {
    if (!isRecording) return;
    
    const timer = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 5) { // Max 5 seconds recording
          stopRecording();
          clearInterval(timer);
          return 0;
        }
        return prev + 0.1;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [isRecording]);
  
  // Render instructions screen
  const renderInstructions = () => (
    <AccessibleCard
      variant="primary"
      className="p-6 text-center"
    >
      <AccessibleText variant="heading2" className="mb-4">
        Dragon Speech Quest
      </AccessibleText>
      
      <div className="w-32 h-32 mx-auto mb-4">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,20 C60,10 80,10 90,20 C95,25 95,35 90,40 C85,45 75,45 70,40 C65,35 65,25 70,20 C75,15 85,15 90,20 M30,20 C40,10 60,10 70,20 C75,25 75,35 70,40 C65,45 55,45 50,40 C45,35 45,25 50,20 C55,15 65,15 70,20" fill={highContrast ? "#FF1493" : "#FF69B4"} stroke="#333" strokeWidth="2" />
          <circle cx="35" cy="30" r="5" fill="#333" />
          <circle cx="65" cy="30" r="5" fill="#333" />
          <path d="M50,50 Q60,60 50,70 Q40,60 50,50" fill="none" stroke="#333" strokeWidth="2" />
        </svg>
      </div>
      
      <AccessibleText variant="body" className="mb-6">
        Help the dragon learn to speak! Practice saying the words clearly, focusing on the highlighted sounds.
      </AccessibleText>
      
      <AccessibleText variant="heading3" className="mb-2">
        Today's sounds: {targetSounds.join(', ')}
      </AccessibleText>
      
      <AccessibleText variant="body" className="mb-6">
        You'll earn dragon tokens for each word you say correctly!
      </AccessibleText>
      
      <AccessibleButton
        onClick={() => setShowInstructions(false)}
        variant="primary"
        size="large"
      >
        Start Quest
      </AccessibleButton>
    </AccessibleCard>
  );
  
  // Render game complete screen
  const renderGameComplete = () => (
    <AccessibleCard
      variant="primary"
      className="p-6 text-center"
    >
      <AccessibleAnimation type={reducedMotion ? 'fade' : 'bounce'}>
        <AccessibleText variant="heading2" className="mb-4">
          Quest Complete!
        </AccessibleText>
        
        <div className="w-48 h-48 mx-auto mb-4">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,20 C60,10 80,10 90,20 C95,25 95,35 90,40 C85,45 75,45 70,40 C65,35 65,25 70,20 C75,15 85,15 90,20 M30,20 C40,10 60,10 70,20 C75,25 75,35 70,40 C65,45 55,45 50,40 C45,35 45,25 50,20 C55,15 65,15 70,20" fill={highContrast ? "#FF1493" : "#FF69B4"} stroke="#333" strokeWidth="2" />
            <circle cx="35" cy="30" r="5" fill="#333" />
            <circle cx="65" cy="30" r="5" fill="#333" />
            <path d="M50,60 Q60,50 70,60 Q60,70 50,60" fill="none" stroke="#333" strokeWidth="2" />
          </svg>
        </div>
        
        <AccessibleText variant="heading3" className="mb-2">
          You earned {tokensEarned} dragon tokens!
        </AccessibleText>
        
        <AccessibleText variant="body" className="mb-6">
          Great job practicing your sounds. The dragon is very happy!
        </AccessibleText>
        
        <AccessibleButton
          onClick={() => {
            setShowInstructions(true);
            setGameComplete(false);
            setCurrentWordIndex(0);
            setAttempts(0);
            setTokensEarned(0);
            setFeedback(null);
            setRecordingUrl(null);
          }}
          variant="primary"
          size="large"
        >
          Play Again
        </AccessibleButton>
      </AccessibleAnimation>
    </AccessibleCard>
  );
  
  // Render main game screen
  const renderGame = () => (
    <AccessibleCard
      variant="neutral"
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <AccessibleText variant="heading2">
          Dragon Speech Quest
        </AccessibleText>
        
        <AccessibleText variant="heading3">
          Word {currentWordIndex + 1}/{targetWords.length}
        </AccessibleText>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <AccessibleCard
            variant="secondary"
            className="p-4 text-center h-full flex flex-col justify-center"
          >
            <AccessibleText variant="heading3" className="mb-2">
              Say this word:
            </AccessibleText>
            
            <AccessibleText variant="heading1" className="mb-4">
              {currentWord.split('').map((letter, index) => {
                const isTargetSound = letter.toLowerCase() === targetSound.toLowerCase();
                return (
                  <span 
                    key={index}
                    className={isTargetSound ? 'text-pink-600 font-bold' : ''}
                  >
                    {letter}
                  </span>
                );
              })}
            </AccessibleText>
            
            <AccessibleText variant="body" className="mb-2">
              Focus on the <span className="text-pink-600 font-bold">{targetSound}</span> sound
            </AccessibleText>
            
            {!simplifiedVisuals && (
              <AccessibleText variant="caption" className="text-gray-500">
                Try to say it clearly and slowly
              </AccessibleText>
            )}
          </AccessibleCard>
        </div>
        
        <div className="flex-1">
          <AccessibleCard
            variant="accent"
            className="p-4 text-center h-full flex flex-col justify-center"
          >
            <div className="w-32 h-32 mx-auto mb-4 relative">
              {/* Dragon animation based on recording state */}
              <motion.div
                animate={isRecording ? {
                  scale: [1, 1.05, 1],
                  transition: { repeat: Infinity, duration: 1 }
                } : {}}
                className="w-full h-full"
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50,20 C60,10 80,10 90,20 C95,25 95,35 90,40 C85,45 75,45 70,40 C65,35 65,25 70,20 C75,15 85,15 90,20 M30,20 C40,10 60,10 70,20 C75,25 75,35 70,40 C65,45 55,45 50,40 C45,35 45,25 50,20 C55,15 65,15 70,20" fill={highContrast ? "#FF1493" : "#FF69B4"} stroke="#333" strokeWidth="2" />
                  <circle cx="35" cy="30" r="5" fill="#333" />
                  <circle cx="65" cy="30" r="5" fill="#333" />
                  {isRecording ? (
                    <path d="M50,50 Q60,55 50,60 Q40,55 50,50" fill="none" stroke="#333" strokeWidth="2" />
                  ) : (
                    <path d="M50,50 Q60,60 50,70 Q40,60 50,50" fill="none" stroke="#333" strokeWidth="2" />
                  )}
                </svg>
              </motion.div>
              
              {/* Recording indicator */}
              {isRecording && (
                <motion.div
                  className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
            </div>
            
            {isRecording ? (
              <>
                <AccessibleText variant="heading3" className="mb-2">
                  Recording...
                </AccessibleText>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <motion.div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(recordingTime / 5) * 100}%` }}
                  />
                </div>
                
                <AccessibleButton
                  onClick={stopRecording}
                  variant="error"
                  size="medium"
                >
                  Stop Recording
                </AccessibleButton>
              </>
            ) : (
              <>
                <AccessibleButton
                  onClick={startRecording}
                  variant="primary"
                  size="large"
                  className="mb-4"
                >
                  <div className="flex items-center justify-center">
                    <AccessibleIcon name="play" size="small" label="Record" className="mr-2" />
                    Record Your Voice
                  </div>
                </AccessibleButton>
                
                {recordingUrl && (
                  <AccessibleText variant="body" className="text-gray-600">
                    Recording saved!
                  </AccessibleText>
                )}
              </>
            )}
          </AccessibleCard>
        </div>
      </div>
      
      {/* Feedback area */}
      {feedback && (
        <AccessibleAnimation type={reducedMotion ? 'fade' : 'scale'}>
          <AccessibleCard
            variant={feedback === 'success' ? 'success' : 'warning'}
            className="p-4 mb-6"
          >
            {feedback === 'success' ? (
              <>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600 mr-2">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <AccessibleText variant="heading3">
                    Great job!
                  </AccessibleText>
                </div>
                
                <AccessibleText variant="body" className="mb-4">
                  You said "{currentWord}" very clearly! The dragon is happy.
                </AccessibleText>
                
                <div className="flex justify-between items-center">
                  <AccessibleText variant="body" className="font-bold">
                    +{Math.max(1, 3 - attempts)} tokens earned!
                  </AccessibleText>
                  
                  <AccessibleButton
                    onClick={nextWord}
                    variant="primary"
                    size="medium"
                  >
                    Next Word
                  </AccessibleButton>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-600 mr-2">
                    <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                  </svg>
                  <AccessibleText variant="heading3">
                    Let's try again!
                  </AccessibleText>
                </div>
                
                <AccessibleText variant="body" className="mb-2">
                  The dragon didn't quite hear the "{targetSound}" sound in "{currentWord}".
                </AccessibleText>
                
                <AccessibleText variant="body" className="mb-4">
                  Try saying it slowly and clearly.
                </AccessibleText>
                
                <AccessibleButton
                  onClick={startRecording}
                  variant="primary"
                  size="medium"
                >
                  Try Again
                </AccessibleButton>
              </>
            )}
          </AccessibleCard>
        </AccessibleAnimation>
      )}
      
      {/* Progress indicator */}
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
   <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>