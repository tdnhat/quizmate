import CategoriesSection from "@/components/discover/categories/CategoriesSection"
import RecommendedSection from "@/components/discover/recommended/RecommendedSection"

const DiscoverPage = () => {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <CategoriesSection />
      <RecommendedSection />
    </div>
  )
}

export default DiscoverPage