import { FileSearch } from "lucide-react";

const NoQuizzesFound = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileSearch className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">
            No quizzes found
        </h3>
        <p className="text-gray-500 max-w-md">
            No quizzes are available for this category. Try adjusting your
            filters or check back later.
        </p>
    </div>
);

export default NoQuizzesFound;
