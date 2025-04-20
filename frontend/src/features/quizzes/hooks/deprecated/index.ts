/**
 * @deprecated These hooks are provided for backward compatibility only.
 * Please use the hooks from the new directories instead.
 */

// Session hooks
export { useSessionDetails } from './useSessionDetails';
export { useQuizSession } from './useQuizSession';
export { useJoinQuiz } from './useJoinQuiz';
export { useSessionByJoinCode } from './useSessionByJoinCode';

// Quiz interaction hooks
export { default as useHostQuiz } from './useHostQuiz';
export { useQuizActions } from './useQuizActions';
export { useQuizEvents } from './useQuizEvents';
export { useQuizSessionHub } from './useQuizSessionHub'; 