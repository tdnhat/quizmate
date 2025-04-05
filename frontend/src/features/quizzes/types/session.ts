import { QuestionData, QuizResults } from '@/services/signalr/hubs/quizSessionHub';
import { Quiz } from '@/types/quiz';

/**
 * Represents a participant in a quiz session
 */
export interface Participant {
  userId: string;
  username: string;
  score: number;
  isActive?: boolean;
  joinedAt?: Date | string;
  leftAt?: Date | string | null;
}

/**
 * Context type for the host quiz provider
 */
export interface HostQuizContextType {
  quiz: Quiz | null;
  sessionId: string;
  participants: Participant[];
  currentQuestion: QuestionData | null;
  isLoading: boolean;
  isSessionStarted: boolean;
  quizResults: QuizResults | null;
  startSession: () => Promise<void>;
  nextQuestion: () => Promise<void>;
  endSession: () => Promise<void>;
  error: string | null;
} 