import CategoriesSection from "@/features/discover/components/CategoriesSection"
import RecommendedSection from "@/features/discover/components/RecommendedSection"

const DiscoverPage = () => {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <CategoriesSection />
      <RecommendedSection />
    </div>
  )
}

export default DiscoverPage