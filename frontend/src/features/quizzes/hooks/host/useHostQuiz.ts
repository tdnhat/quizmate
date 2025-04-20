import { useContext } from 'react';
import { HostQuizContext } from '../../contexts/HostQuizContext';
import { HostQuizContextType } from '../../types/session';

/**
 * Hook to access the HostQuizContext
 * Must be used within a HostQuizProvider
 */
const useHostQuiz = (): HostQuizContextType => {
  const context = useContext(HostQuizContext);
  
  if (!context) {
    throw new Error('useHostQuiz must be used within a HostQuizProvider');
  }
  
  return context;
};

export default useHostQuiz; 