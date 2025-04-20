import { useMutation, useQueryClient } from "@tanstack/react-query";
import { libraryApi } from "../api";
import toast from "react-hot-toast";

interface SaveQuizParams {
    quizId: string;
    title?: string;
}

interface SaveQuizResponse {
    isSaved: boolean;
    title?: string;
    quizId: string;
}

interface DeleteQuizParams {
    quizId: string;
    title?: string;
}

export const useToggleSaveQuizMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ quizId, title }: SaveQuizParams) => {
            return libraryApi.toggleSaveQuiz(quizId).then((response) => {
                // Return the quiz title along with the response
                return { ...response, title, quizId };
            });
        },
        onSuccess: (data: SaveQuizResponse) => {
            // Display appropriate toast message
            const quizTitle = data.title ? `"${data.title}"` : "Quiz";

            if (data.isSaved) {
                toast.success(`${quizTitle} added to your library`);
            } else {
                toast.success(`${quizTitle} removed from your library`);
            }

            // Update the cache directly for immediate UI update
            // This is safer than invalidating as it won't trigger recursive invalidations
            queryClient.setQueryData(["isSaved", data.quizId], {
                isSaved: data.isSaved,
            });

            // Then invalidate the lists which won't cause immediate recursion
            queryClient.invalidateQueries({
                queryKey: ["savedQuizzes"],
                refetchType: "none", // active, none, all
            });
        },
        onError: () => {
            toast.error("Failed to update library");
        },
    });
};

export const useDeleteQuizMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ quizId }: DeleteQuizParams) => {
            return libraryApi.deleteQuiz(quizId);
        },
        onSuccess: (_, variables) => {
            const quizTitle = variables.title ? `"${variables.title}"` : "Quiz";
            toast.success(`${quizTitle} deleted successfully`);

            // Invalidate all relevant queries
            queryClient.invalidateQueries({
                queryKey: ["libraryQuizzes"],
            });
            queryClient.invalidateQueries({
                queryKey: ["savedQuizzes"],
            });
            queryClient.invalidateQueries({
                queryKey: ["my-quizzes"],
            });
        },
        onError: () => {
            toast.error("Failed to delete quiz");
        },
    });
};
