import { Quiz } from "@/types/quiz";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIsSaved } from "../hooks/useIsSaved";
import { useState, useEffect, useCallback } from "react";
import { useLibraryContext } from "../context/LibraryContext";
import { 
    QuizCardThumbnail, 
    QuizCardContent, 
    QuizDeleteDialog 
} from "./quiz-card";

interface QuizCardProps {
    quiz: Quiz;
    viewMode?: "grid" | "list";
}

const QuizCard = ({
    quiz,
    viewMode = "grid",
}: QuizCardProps) => {
    const isListView = viewMode === "list";
    const { data: savedData } = useIsSaved(quiz.id);
    const { deleteQuiz, isDeletingQuiz, activeTab, toggleSaveQuiz } = useLibraryContext();

    // Local state for optimistic UI updates
    const [isSaved, setIsSaved] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Sync with server data when it changes
    useEffect(() => {
        if (savedData?.isSaved !== undefined) {
            setIsSaved(savedData.isSaved);
        }
    }, [savedData]);

    // Ensure body style is cleaned up if component unmounts with dialog open
    useEffect(() => {
        return () => {
            if (showDeleteDialog) {
                document.body.style.removeProperty('pointer-events');
            }
        };
    }, [showDeleteDialog]);

    const handleToggleSave = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Optimistically update UI
        setIsSaved(!isSaved);
        toggleSaveQuiz(quiz.id, quiz.title);
    }, [isSaved, quiz.id, quiz.title, toggleSaveQuiz]);

    const handleDelete = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDeleteDialog(true);
    }, []);

    const confirmDelete = useCallback(() => {
        deleteQuiz(quiz);
        setShowDeleteDialog(false);
    }, [deleteQuiz, quiz]);

    const handleOpenChange = useCallback((open: boolean) => {
        setShowDeleteDialog(open);
        // Ensure pointer-events is removed when dialog closes
        if (!open) {
            document.body.style.removeProperty('pointer-events');
        }
    }, []);

    // Only show delete option for quizzes that the user created (in My Quizzes tab)
    const showDeleteOption = activeTab === 'my-quizzes';

    return (
        <>
            <div className="h-full group">
                <Card
                    className={cn(
                        "h-full gap-0 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all overflow-hidden",
                        isListView ? "flex flex-row items-stretch py-0" : "py-0"
                    )}
                >
                    <QuizCardThumbnail 
                        quiz={quiz}
                        viewMode={viewMode}
                        isSaved={isSaved}
                        isDeletingQuiz={isDeletingQuiz}
                        showDeleteOption={showDeleteOption}
                        onToggleSave={handleToggleSave}
                        onDelete={handleDelete}
                    />
                    
                    <QuizCardContent 
                        quiz={quiz}
                        viewMode={viewMode}
                    />
                </Card>
            </div>

            <QuizDeleteDialog 
                quiz={quiz}
                open={showDeleteDialog}
                onOpenChange={handleOpenChange}
                onConfirm={confirmDelete}
                isDeleting={isDeletingQuiz}
            />
        </>
    );
};

export default QuizCard;
