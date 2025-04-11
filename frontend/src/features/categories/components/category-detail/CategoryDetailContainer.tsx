import QuizGrid from "@/features/quizzes/components/quiz-card/QuizGrid";
import CategoryHeader from "./CategoryHeader";
import { useCategoryDetail } from "../../hooks/useCategoryDetail";
import CategoryDetailBreadcrumb from "./CategoryDetailBreadcrumb";
import NoQuizzesFound from "@/components/shared/components/NoQuizzesFound";

const CategoryDetailContainer = () => {
    const { quizzes, isLoading, categoryName, filters } = useCategoryDetail();

    const renderContent = () => {
        if (isLoading) {
            return (
                <QuizGrid
                    quizzes={[]}
                    isLoading={true}
                    categorySlug={filters.categorySlug}
                />
            );
        }

        if (!quizzes || quizzes.length === 0) {
            return (
                <div>
                    <QuizGrid
                        quizzes={[]}
                        isLoading={false}
                        categorySlug={filters.categorySlug}
                    />
                    <NoQuizzesFound />
                </div>
            );
        }

        return (
            <QuizGrid
                quizzes={quizzes}
                isLoading={isLoading}
                categorySlug={filters.categorySlug}
            />
        );
    };

    return (
        <div className="container mx-auto max-w-6xl p-4">
            {/* Breadcrumb navigation */}
            <CategoryDetailBreadcrumb
                categoryName={categoryName || undefined}
            />

            {/* Header with filters */}
            <CategoryHeader categoryName={categoryName || undefined} />

            {renderContent()}
        </div>
    );
};

export default CategoryDetailContainer;
