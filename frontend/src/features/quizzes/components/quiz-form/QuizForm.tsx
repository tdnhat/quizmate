import { Category } from "@/types/category";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import LoadingIndicator from "@/components/shared/components/LoadingIndicator";
import { quizFormSchema, QuizFormValues } from "../../schemas/quizFormSchema";
import { QuizBasicDetails } from "./basic-details/QuizBasicDetails";

interface QuizFormProps {
    categories: Category[];
    onSubmit: (values: QuizFormValues) => Promise<void>;
    isLoading: boolean;
    initialValues?: Partial<QuizFormValues>;
    submitLabel?: string;
    buttonClassName?: string;
}

export const QuizForm = ({
    categories,
    onSubmit,
    isLoading,
    initialValues,
    submitLabel = "Next",
}: QuizFormProps) => {
    const form = useForm<QuizFormValues>({
        resolver: zodResolver(quizFormSchema),
        defaultValues: {
            title: initialValues?.title || "",
            description: initialValues?.description || "",
            category: initialValues?.category || "",
            thumbnail: initialValues?.thumbnail || "",
            timeMinutes: initialValues?.timeMinutes || 5,
            difficulty: initialValues?.difficulty || "Beginner",
            tags: initialValues?.tags || [],
        },
    });

    const handleFormSubmit = async (values: QuizFormValues) => {
        await onSubmit(values);
        form.reset();
    };

    return (
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
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white hover:cursor-pointer transition-colors"
                    >
                        {isLoading ? (
                            <>
                                <LoadingIndicator />
                                <span>Creating...</span>
                            </>
                        ) : (
                            submitLabel
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
