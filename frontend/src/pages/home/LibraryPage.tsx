import { useState, useEffect } from "react";
import {
    LibraryProvider,
    useLibraryContext,
    QuizList,
    LibrarySearch,
    Pagination,
    useSavedQuizzesQuery,
} from "../../features/library";
import { QuizQueryParams } from "../../features/library/types";

const LibraryContent = () => {
    const { queryParams, updateQueryParams, setTotalPages } =
        useLibraryContext();
    const {
        data: quizzes,
        isLoading,
        error,
    } = useSavedQuizzesQuery(queryParams);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (quizzes?.length) {
            setTotalItems(quizzes.length * 3);
            const calculatedPages = Math.ceil(
                totalItems / (queryParams.pageSize || 9)
            );
            setTotalPages(Math.max(1, calculatedPages));
        }
    }, [quizzes, queryParams.pageSize, setTotalPages, totalItems]);

    const handleSearchChange = (newParams: QuizQueryParams) => {
        updateQueryParams(newParams);
    };

    const handlePageChange = (pageNumber: number) => {
        updateQueryParams({ pageNumber });
        window.scrollTo(0, 0);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">My Saved Quizzes</h1>

            <LibrarySearch
                onSearch={handleSearchChange}
                initialParams={queryParams}
            />

            <QuizList
                quizzes={quizzes || []}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
            />

            <Pagination
                currentPage={queryParams.pageNumber || 1}
                totalPages={Math.ceil(totalItems / (queryParams.pageSize || 9))}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

const LibraryPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <LibraryProvider>
                <LibraryContent />
            </LibraryProvider>
        </div>
    );
};

export default LibraryPage;
