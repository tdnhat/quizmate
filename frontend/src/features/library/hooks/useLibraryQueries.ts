import { useQuery } from '@tanstack/react-query';
import { libraryApi } from '../api';
import { QuizQueryParams } from '../types';

export const useSavedQuizzesQuery = (params: QuizQueryParams = {}) => {
  return useQuery({
    queryKey: ['savedQuizzes', params],
    queryFn: () => libraryApi.getSavedQuizzes(params),
  });
};

export const useIsQuizSavedQuery = (quizId: string) => {
  return useQuery({
    queryKey: ['isQuizSaved', quizId],
    queryFn: () => libraryApi.isQuizSaved(quizId),
    enabled: !!quizId,
  });
}; 