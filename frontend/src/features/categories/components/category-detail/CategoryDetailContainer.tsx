import QuizGrid from "@/features/quizzes/components/quiz-card/QuizGrid";
import CategoryHeader from "./CategoryHeader";
import { useCategoryDetail } from "../../hooks/useCategoryDetail";
import { FileSearch } from "lucide-react";
import CategoryDetailBreadcrumb from "./CategoryDetailBreadcrumb";

const CategoryDetailContainer = () => {
    const { quizzes, isLoading, categoryName } = useCategoryDetail();

    const renderContent = () => {
        if (isLoading) {
            return <QuizGrid quizzes={[]} isLoading={true} />;
        }

        if (!quizzes || quizzes.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <FileSearch className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">
                        No quizzes found
                    </h3>
                    <p className="text-gray-500 max-w-md">
                        No quizzes are available for this category. Try
                        adjusting your filters or check back later.
                    </p>
                </div>
            );
        }

        return <QuizGrid quizzes={quizzes} isLoading={isLoading} />;
    };

    return (
        <div className="container mx-auto max-w-6xl p-4">
            {/* Breadcrumb navigation */}
            <CategoryDetailBreadcrumb
                categoryName={categoryName || undefined}
            />

            {/* Header */}
            <CategoryHeader categoryName={categoryName || undefined} />

            {renderContent()}
        </div>
    );
};

export default CategoryDetailContainer;
