import CategoriesSection from "@/features/discover/components/CategoriesSection";
import RecommendedSection from "@/features/discover/components/RecommendedSection";

const HomePage = () => {
    return (
        <div className="flex flex-col max-w-6xl mx-auto gap-4 p-4">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-cyan-600">Home</h1>
                <p className="text-gray-600 mb-6">
                    Welcome to the home page of QuizMate
                </p>
            </div>
            <CategoriesSection />
            <RecommendedSection />
        </div>
    );
};

export default HomePage;
