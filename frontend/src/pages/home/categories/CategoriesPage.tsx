import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/category";
import CategoryGrid from "@/features/categories/components/CategoryGrid";
import { Link } from "react-router-dom";
import { Clock, List, Crown, TrendingUp, ArrowRight } from "lucide-react";
import CategoryDetailBreadcrumb from "@/features/categories/components/category-detail/CategoryDetailBreadcrumb";
import { CategoryCarousel } from "@/features/categories/components/category-card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
const CategoriesPage = () => {
    const {
        data: categories = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const featuredCategories = categories.sort(() => Math.random() - 0.5).slice(0, 6);
    const popularCategories = categories.sort(() => Math.random() - 0.5).slice(0, 6);
    const recentlyAddedCategories = categories.sort(() => Math.random() - 0.5).slice(0, 6);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto max-w-6xl p-4">
            <CategoryDetailBreadcrumb />
            <h1 className="text-2xl font-bold text-cyan-600">All Categories</h1>
            <p className="text-gray-600 mb-6">
                Explore a wide range of categories to find the perfect quiz for
                you.
            </p>

            {/* Featured Categories Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center text-cyan-600 gap-2">
                        <Crown size={24} className="text-yellow-500 mr-2" />
                        Featured Categories
                    </h2>
                </div>
                <CategoryCarousel categories={featuredCategories} />
            </section>

            {/* Popular Categories Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center text-cyan-600 gap-2">
                        <TrendingUp size={24} className="text-red-500 mr-2" />
                        Popular Categories
                    </h2>
                </div>
                <CategoryCarousel categories={popularCategories} />
            </section>

            {/* Recently Added Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center text-cyan-600 gap-2">
                        <Clock size={24} className="text-blue-500 mr-2" />
                        Recently Added
                    </h2>
                </div>
                <CategoryCarousel categories={recentlyAddedCategories} />
            </section>

            {/* All Categories Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center text-cyan-600 gap-2">
                        <List size={24} className="text-green-500 mr-2" />
                        All Categories
                    </h2>
                    <Link
                        to="/categories/all"
                        className="flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-800 font-medium"
                    >
                        View all
                        <ArrowRight size={16} />
                    </Link>
                </div>
                <CategoryGrid categories={categories.slice(0, 6)} isLoading={isLoading} />

                {/* Browse All button */}
                <Link
                    to="/categories/all"
                    className="flex items-center justify-center gap-2 mt-4"
                >
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full md:w-auto cursor-pointer"
                    >
                        View all
                    </Button>
                </Link>
            </section>
        </div>
    );
};

export default CategoriesPage;
