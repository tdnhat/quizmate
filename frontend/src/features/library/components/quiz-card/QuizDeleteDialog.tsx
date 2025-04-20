import { Quiz } from "@/types/quiz";
import { useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface QuizDeleteDialogProps {
    quiz: Quiz;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

const QuizDeleteDialog = ({
    quiz,
    open,
    onOpenChange,
    onConfirm,
    isDeleting,
}: QuizDeleteDialogProps) => {
    // Ensure body style is cleaned up when dialog unmounts or closes
    useEffect(() => {
        // Clean up when dialog closes
        if (!open) {
            // Force remove pointer-events style from body
            document.body.style.removeProperty('pointer-events');
        }
        
        // Clean up on unmount
        return () => {
            document.body.style.removeProperty('pointer-events');
        };
    }, [open]);

    const handleCancel = () => {
        // Ensure pointer-events are removed before state updates
        document.body.style.removeProperty('pointer-events');
        onOpenChange(false);
    };

    const handleConfirm = () => {
        // Ensure pointer-events are removed before callbacks
        document.body.style.removeProperty('pointer-events');
        onConfirm();
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete "{quiz.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handleConfirm}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default QuizDeleteDialog; 