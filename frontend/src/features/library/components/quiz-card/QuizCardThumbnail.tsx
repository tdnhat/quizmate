import { Quiz } from "@/types/quiz";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import QuizThumbnail from "@/features/quizzes/components/quiz-card/QuizThumbnail";
import { cn } from "@/lib/utils";
import {
    BookmarkIcon,
    Bookmark,
    MoreVertical,
    Eye,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface QuizCardThumbnailProps {
    quiz: Quiz;
    viewMode: "grid" | "list";
    isSaved: boolean;
    isDeletingQuiz: boolean;
    showDeleteOption: boolean;
    onToggleSave: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
}

const QuizCardThumbnail = ({
    quiz,
    viewMode,
    isSaved,
    isDeletingQuiz,
    showDeleteOption,
    onToggleSave,
    onDelete,
}: QuizCardThumbnailProps) => {
    const isListView = viewMode === "list";

    return (
        <div
            className={cn(
                "overflow-hidden relative",
                isListView ? "flex-shrink-0 w-48 self-stretch" : ""
            )}
        >
            <div className={isListView ? "h-full" : ""}>
                <QuizThumbnail quiz={quiz} viewMode={viewMode} />
            </div>

            {/* Three dots menu */}
            <div className="absolute top-2 left-2 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="bg-white/80 rounded-full p-1.5 hover:bg-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreVertical className="h-4 w-4 text-gray-700" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link
                                to={`/quizzes/${quiz.slug}`}
                                className="flex items-center cursor-pointer"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                            </Link>
                        </DropdownMenuItem>
                        
                        {showDeleteOption && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={onDelete}
                                    className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
                                    disabled={isDeletingQuiz}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>{isDeletingQuiz ? "Deleting..." : "Delete Quiz"}</span>
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Bookmark button */}
            <button
                onClick={onToggleSave}
                className="absolute top-2 right-2 bg-white/80 rounded-full p-1 transition-all z-10"
                aria-label={
                    isSaved ? "Remove from library" : "Add to library"
                }
            >
                <AnimatePresence mode="wait">
                    {isSaved ? (
                        <motion.div
                            key="saved"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                rotate: [0, 15, -15, 0],
                            }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                rotate: { duration: 0.4 },
                            }}
                            className="text-yellow-500 hover:text-yellow-600"
                        >
                            <Bookmark className="w-5 h-5 fill-yellow-500" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unsaved"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-yellow-500 hover:text-yellow-600"
                        >
                            <BookmarkIcon className="w-5 h-5" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
};

export default QuizCardThumbnail; 