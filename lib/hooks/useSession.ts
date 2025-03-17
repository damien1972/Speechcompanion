// useSession hook for Speech Therapy Companion

import { useContext } from 'react';
import { SessionContext, SessionContextType } from '../contexts/SessionContext';

/**
 * Hook to access the session context
 * @returns Session context values and methods
 */
export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  
  return context;
};
