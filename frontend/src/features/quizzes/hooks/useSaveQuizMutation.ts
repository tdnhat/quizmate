import { useMutation, useQueryClient } from '@tanstack/react-query';
import { libraryApi } from '../../library/api';
import toast from 'react-hot-toast';

interface SaveQuizParams {
  quizId: string;
  title: string;
}

interface SaveQuizResponse {
  isSaved: boolean;
  title: string;
  quizId: string;
}

export const useSaveQuizMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ quizId, title }: SaveQuizParams) => {
      return libraryApi.toggleSaveQuiz(quizId).then(response => {
        // Return the quiz title and id along with the response
        return { ...response, title, quizId };
      });
    },
    onSuccess: (data: SaveQuizResponse) => {
      // Display appropriate toast message based on the action
      if (data.isSaved) {
        toast.success(`"${data.title}" added to your library`);
      } else {
        toast.success(`"${data.title}" removed from your library`);
      }
      
      // Update the cache directly for immediate UI update
      // This is safer than invalidating as it won't trigger recursive invalidations
      queryClient.setQueryData(['isSaved', data.quizId], { isSaved: data.isSaved });
      
      // Then invalidate the lists which won't cause immediate recursion
      queryClient.invalidateQueries({ 
        queryKey: ['savedQuizzes'],
        refetchType: 'none' // Prevent automatic refetching
      });
      
      queryClient.invalidateQueries({ 
        queryKey: ['quizzes'],
        refetchType: 'none' // Prevent automatic refetching
      });
    },
    onError: () => {
      toast.error("Failed to update library");
    }
  });
}; 