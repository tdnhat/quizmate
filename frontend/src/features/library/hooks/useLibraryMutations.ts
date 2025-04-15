import { useMutation, useQueryClient } from '@tanstack/react-query';
import { libraryApi } from '../api';

export const useToggleSaveQuizMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (quizId: string) => libraryApi.toggleSaveQuiz(quizId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedQuizzes'] });
    },
  });
}; 