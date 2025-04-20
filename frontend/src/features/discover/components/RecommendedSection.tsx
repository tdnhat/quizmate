import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useQuizzes } from "@/features/quizzes/hooks/useQuizzes";
import QuizCarousel from "@/features/quizzes/components/quiz-card/QuizCarousel";
import { Skeleton } from "@/components/ui/skeleton";

const RecommendedSkeleton = () => {
    return (
        <div className="flex w-full">
            <Skeleton className="h-48 w-full" />
        </div>
    );
};

const RecommendedSection = () => {
    // Mock data for recommended quizzes
    const { quizzes, isLoading } = useQuizzes();

    if (isLoading) {
        return (
            <div className="flex flex-col w-full">
                <SectionHeader
                    title="Recommended for you"
                    actionLink="/quizzes/all"
                    actionText="View all"
                    icon={<ArrowRight size={16} />}
                />
                <RecommendedSkeleton />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full mt-8">
            <SectionHeader
                title="Recommended for you"
                actionLink="/quizzes/all"
                actionText="View all"
                icon={<ArrowRight size={16} />}
            />
            <QuizCarousel quizzes={quizzes.slice(0, 6)} />
        </div>
    );
};

export default RecommendedSection;
