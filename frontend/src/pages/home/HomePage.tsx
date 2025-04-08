import CategoriesSection from "@/features/discover/components/CategoriesSection";
import RecommendedSection from "@/features/discover/components/RecommendedSection";

const HomePage = () => {
    return (
        <div className="flex flex-col max-w-6xl mx-auto gap-4 p-4">
            <CategoriesSection />
            <RecommendedSection />
        </div>
    );
};

export default HomePage;
