import CategoriesSection from "@/features/discover/components/CategoriesSection";
import RecommendedSection from "@/features/discover/components/RecommendedSection";

const DiscoverPage = () => {
    return (
        <div className="flex flex-col max-w-6xl mx-auto gap-4 px-4 py-8">
            <CategoriesSection />
            <RecommendedSection />
        </div>
    );
};

export default DiscoverPage;
