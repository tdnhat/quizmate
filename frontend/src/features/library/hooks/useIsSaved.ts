import { useQuery } from "@tanstack/react-query";
import { libraryApi } from "../api";
import { useEffect } from "react";

export const useIsSaved = (quizId: string) => {
    // Use a consistent key for the saved status
    const queryKey = ["isSaved", quizId];

    // Set up the query with appropriate settings
    const query = useQuery({
        queryKey,
        queryFn: () => libraryApi.isQuizSaved(quizId),
        enabled: !!quizId,
        staleTime: 0,
        refetchOnMount: true,
    });

    // Instead of subscribing to all cache changes, we'll use a more focused approach
    // to avoid the infinite recursion
    useEffect(() => {
        // Set up a refetch interval if needed
        const interval = setInterval(() => {
            if (document.visibilityState === "visible") {
                // Only refetch if the page is visible to the user
                query.refetch();
            }
        }, 5000); // Check every 5 seconds

        return () => {
            clearInterval(interval);
        };
    }, [quizId, query]);

    return query;
};
