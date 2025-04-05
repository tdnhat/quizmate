import { useState, useCallback } from 'react';
import QuizSessionHubConnection from '@/services/signalr/hubs/quizSessionHub';

interface UseQuizActionsParams {
  hubConnection: QuizSessionHubConnection | null;
  sessionId: string;
  token: string | null;
}

interface UseQuizActionsResult {
  startSession: () => Promise<void>;
  nextQuestion: () => Promise<void>;
  endSession: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to handle quiz session actions like start, next question, and end
 */
export const useQuizActions = ({ 
  hubConnection, 
  sessionId, 
  token 
}: UseQuizActionsParams): UseQuizActionsResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Start the quiz session
  const startSession = useCallback(async () => {
    try {
      console.log('Starting session...', { hubConnection, sessionId });
      if (!hubConnection) {
        console.error('Hub connection is null, cannot start session');
        setError('Connection not established. Please refresh the page and try again.');
        return;
      }
      
      setIsLoading(true);
      console.log('Calling hubConnection.startSession');
      await hubConnection.startSession(sessionId);
      console.log('Session started successfully');
    } catch (err) {
      console.error('Failed to start session', err);
      setError('Failed to start session: ' + (err instanceof Error ? err.message : String(err)));
      
      // If we get a "Connection not established" error, attempt to reconnect
      if (err instanceof Error && err.message.includes('Connection not established') && token) {
        const connection = new QuizSessionHubConnection(token);
        const success = await connection.start();
        if (success) {
          await connection.joinSession(sessionId);
          setError('Please try starting the session again');
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [hubConnection, sessionId, token]);

  // Move to the next question
  const nextQuestion = useCallback(async () => {
    try {
      if (!hubConnection) {
        setError('Connection not established');
        return;
      }

      setIsLoading(true);
      await hubConnection.nextQuestion(sessionId);
    } catch (err) {
      setError('Failed to advance to next question');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [hubConnection, sessionId]);

  // End the quiz session
  const endSession = useCallback(async () => {
    try {
      if (!hubConnection) {
        setError('Connection not established');
        return;
      }

      setIsLoading(true);
      await hubConnection.endSession(sessionId);
    } catch (err) {
      setError('Failed to end session');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [hubConnection, sessionId]);

  return {
    startSession,
    nextQuestion,
    endSession,
    isLoading,
    error
  };
}; 