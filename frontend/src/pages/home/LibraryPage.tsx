import { useState, useEffect } from "react";
import {
    LibraryProvider,
    useLibraryContext,
    QuizList,
    LibraryTabs,
    LibraryFilterBar,
    Pagination,
    useLibraryQuizzesQuery,
} from "../../features/library";
import LibraryBreadcrumb from "@/features/library/components/LibraryBreadcrumb";

const LibraryContent = () => {
    const { queryParams, updateQueryParams, setTotalPages } =
        useLibraryContext();
    const {
        data: quizzes,
        isLoading,
        error,
    } = useLibraryQuizzesQuery(queryParams);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (quizzes?.length) {
            setTotalItems(quizzes.length);
            const calculatedPages = Math.ceil(
                totalItems / (queryParams.pageSize || 9)
            );
            setTotalPages(Math.max(1, calculatedPages));
        }
    }, [quizzes, queryParams.pageSize, setTotalPages, totalItems]);

    const handlePageChange = (pageNumber: number) => {
        updateQueryParams({ pageNumber });
        window.scrollTo(0, 0);
    };

    return (
        <div className="space-y-6">
            <LibraryBreadcrumb />
            <div className="flex flex-col mb-6">
                <h1 className="text-2xl font-bold">My Library</h1>
                <p className="text-gray-500">
                    Here you can find all the quizzes you have saved.
                </p>
            </div>

            <LibraryTabs className="mb-6" />

            <LibraryFilterBar />

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
        <div className="container mx-auto px-4 py-6">
            <LibraryProvider>
                <LibraryContent />
            </LibraryProvider>
        </div>
    );
};

export default LibraryPage;
