import { useState, useEffect } from 'react';
import QuizSessionHubConnection, {
  ParticipantJoinedEvent,
  QuestionData,
  ScoreUpdate,
  QuizResults
} from '@/services/signalr/hubs/quizSessionHub';
import { QuizSessionState } from '../../types/quizSession';

interface UseQuizEventsParams {
  hubConnection: QuizSessionHubConnection | null;
}

interface UseQuizEventsResult {
  participants: ParticipantJoinedEvent[];
  currentQuestion: QuestionData | null;
  isSessionStarted: boolean;
  quizResults: QuizResults | null;
  sessionState: QuizSessionState;
}

/**
 * Hook to handle SignalR events from the quiz session hub
 */
export const useQuizEvents = ({ hubConnection }: UseQuizEventsParams): UseQuizEventsResult => {
  const [participants, setParticipants] = useState<ParticipantJoinedEvent[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [isSessionStarted, setIsSessionStarted] = useState<boolean>(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [sessionState, setSessionState] = useState<QuizSessionState>(QuizSessionState.WaitingToStart);

  useEffect(() => {
    if (!hubConnection) return;

    // Set up event handlers
    hubConnection.onParticipantJoined((data: ParticipantJoinedEvent) => {
      setParticipants((prev) => {
        const existingIndex = prev.findIndex(
          (p) => p.userId === data.userId
        );
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = data;
          return updated;
        }
        return [...prev, data];
      });
    });

    hubConnection.onParticipantLeft((data) => {
      setParticipants((prev) =>
        prev.filter((p) => p.userId !== data.userId)
      );
    });

    hubConnection.onSessionStarted(() => {
      setIsSessionStarted(true);
      setSessionState(QuizSessionState.Active);
    });

    hubConnection.onNewQuestion((data: QuestionData) => {
      setCurrentQuestion(data);
      setSessionState(QuizSessionState.Active);
    });

    // Use direct connection.on for scoreUpdate (camelCase)
    hubConnection.connection?.on("scoreUpdate", (data: ScoreUpdate) => {
      console.log("Score update received:", data);
      setParticipants((prev) => {
        const updated = [...prev];
        const index = updated.findIndex(
          (p) => p.userId === data.userId
        );
        if (index >= 0) {
          updated[index] = { ...updated[index], score: data.score };
        }
        return updated;
      });
    });

    // Add handlers for new events
    if (typeof hubConnection.onSessionStateChanged === 'function') {
      hubConnection.onSessionStateChanged((state: string) => {
        console.log("Host received session state change:", state);
        // Map string state to enum
        switch (state) {
          case "WaitingToStart":
            setSessionState(QuizSessionState.WaitingToStart);
            break;
          case "Active":
            setSessionState(QuizSessionState.Active);
            setIsSessionStarted(true);
            break;
          case "BetweenQuestions":
            setSessionState(QuizSessionState.BetweenQuestions);
            break;
          case "ShowingResults":
            setSessionState(QuizSessionState.ShowingResults);
            break;
          case "Ended":
            setSessionState(QuizSessionState.Ended);
            setIsSessionStarted(false);
            break;
          case "Paused":
            setSessionState(QuizSessionState.Paused);
            break;
        }
      });
    } else {
      // Use the now public connection property for a fallback
      hubConnection?.connection?.on("sessionStateChanged", (state: string) => {
        console.log("Host received session state change (fallback):", state);
        // Handle state similarly as above
        switch (state) {
          case "Active":
            setSessionState(QuizSessionState.Active);
            setIsSessionStarted(true);
            break;
          case "BetweenQuestions":
            setSessionState(QuizSessionState.BetweenQuestions);
            break;
          case "ShowingResults":
            setSessionState(QuizSessionState.ShowingResults);
            break;
          case "Ended":
            setSessionState(QuizSessionState.Ended);
            setIsSessionStarted(false);
            break;
        }
      });
    }

    if (typeof hubConnection.onQuestionCompleted === 'function') {
      hubConnection.onQuestionCompleted(() => {
        console.log("Host received question completed");
        setSessionState(QuizSessionState.BetweenQuestions);
      });
    } else {
      // Use the now public connection property for a fallback
      hubConnection?.connection?.on("questionCompleted", () => {
        console.log("Host received question completed (fallback)");
        setSessionState(QuizSessionState.BetweenQuestions);
      });
    }

    if (typeof hubConnection.onShowingResults === 'function') {
      hubConnection.onShowingResults(() => {
        console.log("Host received showing results");
        setSessionState(QuizSessionState.ShowingResults);
      });
    } else {
      // Use the now public connection property for a fallback
      hubConnection?.connection?.on("showingResults", () => {
        console.log("Host received showing results (fallback)");
        setSessionState(QuizSessionState.ShowingResults);
      });
    }

    hubConnection.onQuizEnded((results) => {
      console.log("Host received quiz ended with results:", results);
      setQuizResults(results);
      setIsSessionStarted(false);
      setSessionState(QuizSessionState.Ended);
    });

    // Add direct handler for quizEnded event as fallback
    hubConnection?.connection?.on("quizEnded", (results) => {
      console.log("Quiz ended event received (fallback):", results);
      setQuizResults(results);
      setIsSessionStarted(false);
      setSessionState(QuizSessionState.Ended);
    });

    return () => {
      // Clean up event handlers
      hubConnection?.connection?.off("scoreUpdate");
      hubConnection?.connection?.off("sessionStateChanged");
      hubConnection?.connection?.off("questionCompleted");
      hubConnection?.connection?.off("showingResults");
      hubConnection?.connection?.off("quizEnded");
    };
  }, [hubConnection]);

  return {
    participants,
    currentQuestion,
    isSessionStarted,
    quizResults,
    sessionState
  };
}; 