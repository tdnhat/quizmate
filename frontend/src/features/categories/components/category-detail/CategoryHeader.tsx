interface CategoryHeaderProps {
    categoryName?: string;
}

const CategoryHeader = ({ categoryName }: CategoryHeaderProps) => {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold">
                {categoryName || "Category"} Quizzes
            </h1>
            <p className="text-gray-600">
                Test your knowledge of {categoryName?.toLowerCase() || "subject"} concepts
            </p>
        </div>
    );
};

export default CategoryHeader;