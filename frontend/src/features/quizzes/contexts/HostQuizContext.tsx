import { createContext, ReactNode } from 'react';
import { Quiz } from '@/types/quiz';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { HostQuizContextType, Participant } from '../types/session';
import { useQuizActions, useQuizConnection, useQuizEvents, useQuizSession } from '../hooks';

export const HostQuizContext = createContext<HostQuizContextType | undefined>(undefined);

export const HostQuizProvider = ({
  children,
  quiz,
}: {
  children: ReactNode;
  quiz: Quiz;
}) => {
  const { token } = useAuth();
  
  // Step 1: Create a quiz session
  const { 
    sessionId,
    isLoading: isSessionLoading,
    error: sessionError 
  } = useQuizSession({ quiz });
  
  // Step 2: Connect to SignalR hub
  const { 
    hubConnection, 
    isConnecting, 
    error: connectionError 
  } = useQuizConnection({ 
    token, 
    sessionId 
  });
  
  // Step 3: Set up event handlers
  const {
    participants: rawParticipants,
    currentQuestion,
    isSessionStarted,
    quizResults
  } = useQuizEvents({ hubConnection });
  
  // Map participants to match the expected Participant interface for the ParticipantsList component
  const participants: Participant[] = rawParticipants.map(p => ({
    userId: p.userId,
    username: p.username,
    score: p.score,
    // These additional properties are now optional in ParticipantsList
    isActive: p.isActive,
    joinedAt: p.joinedAt,
    leftAt: p.leftAt
  }));
  
  // Step 4: Define actions
  const {
    startSession,
    nextQuestion,
    endSession,
    isLoading: isActionLoading,
    error: actionError
  } = useQuizActions({
    hubConnection,
    sessionId,
    token
  });
  
  // Combine loading states and errors
  const isLoading = isSessionLoading || isConnecting || isActionLoading;
  const error = sessionError || connectionError || actionError;

  return (
    <HostQuizContext.Provider
      value={{
        quiz,
        sessionId,
        participants,
        currentQuestion,
        isLoading,
        isSessionStarted,
        quizResults,
        startSession,
        nextQuestion,
        endSession,
        error,
      }}
    >
      {children}
    </HostQuizContext.Provider>
  );
};
