import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateQuizForm } from "./CreateQuizForm";
import { QuizFormValues } from "@/features/quizzes/schemas/quizFormSchema";
import { QuizFormProvider } from "@/features/quizzes/contexts/QuizFormContext";

export const NavbarCreate = () => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();

    const isCreatingQuiz = location.pathname.includes("/quizzes/create");

    const handleSubmit = async (values: QuizFormValues) => {
        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setOpen(false);

            // Redirect to the full quiz creation page with pre-filled values
            navigate("/quizzes/create", {
                state: { initialValues: values, isFromModal: true },
            });
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    disabled={isLoading || isCreatingQuiz}
                    className="bg-cyan-600 hover:cursor-pointer hover:bg-cyan-700 transition-colors text-white hidden md:block"
                >
                    Create
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90%] md:max-w-[85%] lg:max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-cyan-600">Create new quiz</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to create a new quiz
                    </DialogDescription>
                </DialogHeader>

                <QuizFormProvider>
                    <CreateQuizForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </QuizFormProvider>
            </DialogContent>
        </Dialog>
    );
};
