import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface LibraryHeaderProps {
    title?: string;
    description?: string;
    onAddQuiz?: () => void;
}

const LibraryHeader = ({
    title = "My Library",
    description = "Here you can find all the quizzes you have saved.",
    onAddQuiz,
}: LibraryHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-cyan-600">{title}</h1>
                <p className="text-gray-500 text-sm">{description}</p>
            </div>
            <Link to="/quizzes/create">
                <Button
                    onClick={onAddQuiz}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white transition-colors duration-300"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Quiz
                </Button>
            </Link>
        </div>
    );
};

export default LibraryHeader;
