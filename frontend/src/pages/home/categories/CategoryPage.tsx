import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/category";
import CategoryGrid from "@/features/categories/components/CategoryGrid";
import { Link } from "react-router-dom";
import { Clock, List, Crown, TrendingUp } from "lucide-react";
import CategoryDetailBreadcrumb from "@/features/categories/components/category-detail/CategoryDetailBreadcrumb";

const CategoryPage = () => {
    const {
        data: categories = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto max-w-6xl p-4">
            <CategoryDetailBreadcrumb />
            <h1 className="text-2xl font-bold">All Categories</h1>
            <p className="text-gray-600 mb-6">
                Explore a wide range of categories to find the perfect quiz for
                you.
            </p>

            {/* Featured Categories Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Crown size={24} className="text-yellow-500 mr-2" />
                        Featured Categories
                    </h2>
                </div>
                <CategoryGrid
                    categories={categories.slice(0, 4)}
                    isLoading={isLoading}
                />
            </section>

            {/* Popular Categories Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <TrendingUp size={24} className="text-red-500 mr-2" />
                        Popular Categories
                    </h2>
                </div>
                <CategoryGrid
                    categories={categories.slice(0, 4)}
                    isLoading={isLoading}
                />
            </section>

            {/* Recently Added Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Clock size={24} className="text-blue-500 mr-2" />
                        Recently Added
                    </h2>
                </div>
                <CategoryGrid
                    categories={categories.slice(0, 4)}
                    isLoading={isLoading}
                />
            </section>

            {/* All Categories Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <List size={24} className="text-green-500 mr-2" />
                        All Categories
                    </h2>
                    <Link
                        to="/categories/all"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        View all →
                    </Link>
                </div>
                <CategoryGrid categories={categories} isLoading={isLoading} />
            </section>
        </div>
    );
};

export default CategoryPage;
