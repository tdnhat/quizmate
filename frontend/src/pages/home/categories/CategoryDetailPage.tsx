import { useParams } from "react-router-dom";
import { CategoryDetailProvider } from "@/features/categories/contexts/CategoryDetailContext";
import CategoryDetailContainer from "@/features/categories/components/category-detail/CategoryDetailContainer";

// Main component that provides the context
const CategoryDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();

    return (
        <CategoryDetailProvider categorySlug={slug}>
            <CategoryDetailContainer />
        </CategoryDetailProvider>
    );
};

export default CategoryDetailPage;
