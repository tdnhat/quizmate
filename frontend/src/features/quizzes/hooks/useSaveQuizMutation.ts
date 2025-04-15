import { useMutation, useQueryClient } from '@tanstack/react-query';
import { libraryApi } from '../../library/api';

export const useSaveQuizMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (quizId: string) => libraryApi.toggleSaveQuiz(quizId),
    onSuccess: () => {
      // Invalidate both the library savedQuizzes and any quiz lists that might be affected
      queryClient.invalidateQueries({ queryKey: ['savedQuizzes'] });
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
}; 