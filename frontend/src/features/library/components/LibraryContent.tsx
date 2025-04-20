import { useState, useEffect } from "react";
import { useLibraryContext, QuizList, useLibraryQuizzesQuery } from "../index";
import LibraryBreadcrumb from "./LibraryBreadcrumb";
import LibraryHeader from "./LibraryHeader";
import LibraryTabs from "./LibraryTabs";
import LibraryFilterBar from "./LibraryFilterBar";
import Pagination from "./Pagination";

const LibraryContent = () => {
    const { queryParams, updateQueryParams, setTotalPages } = useLibraryContext();
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

    // Move on top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="space-y-6">
            <LibraryBreadcrumb />
            <LibraryHeader />
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

export default LibraryContent; 