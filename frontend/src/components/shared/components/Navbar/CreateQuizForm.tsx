import { Category } from "@/types/category";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingIndicator from "../LoadingIndicator";
import { QuizBasicDetails } from "@/features/quizzes/components/quiz-form/basic-details/QuizBasicDetails";
import {
    quizFormSchema,
    QuizFormValues,
} from "@/features/quizzes/schemas/quizFormSchema";

interface CreateQuizFormProps {
    categories: Category[];
    onSubmit: (values: QuizFormValues) => Promise<void>;
    isLoading: boolean;
}

export const CreateQuizForm = ({
    categories,
    onSubmit,
    isLoading,
}: CreateQuizFormProps) => {
    const form = useForm<QuizFormValues>({
        resolver: zodResolver(quizFormSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            thumbnail: undefined,
            timeMinutes: 5,
            difficulty: "Beginner",
            tags: [],
            isPublic: true,
        },
    });

    const handleFormSubmit = async (values: QuizFormValues) => {
        await onSubmit(values);
        form.reset();
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    className="space-y-4"
                >
                    {form.formState.errors.root && (
                        <div className="bg-red-50 text-red-500 px-3 py-2 rounded-md text-sm">
                            {form.formState.errors.root.message}
                        </div>
                    )}

                    <QuizBasicDetails
                        form={form}
                        categories={categories}
                        isLoading={isLoading}
                        layout="compact"
                    />
                </form>
            </Form>

            <DialogFooter>
                <Button
                    onClick={form.handleSubmit(handleFormSubmit)}
                    disabled={isLoading}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white hover:cursor-pointer transition-colors"
                >
                    {isLoading ? (
                        <>
                            <LoadingIndicator />
                            <span>Creating...</span>
                        </>
                    ) : (
                        "Next"
                    )}
                </Button>
            </DialogFooter>
        </>
    );
};
