import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useQuizForm } from "../../hooks/useQuizForm";
import { quizFormSchema, QuizFormValues } from "../../schemas/quizFormSchema";
import { QuizBasicDetails } from "./basic-details/QuizBasicDetails";
import { ChevronRightIcon } from "lucide-react";

export const BasicDetailsStep = () => {
    const { formValues, setFormValues, goToNextStep } = useQuizForm();

    const form = useForm<QuizFormValues>({
        resolver: zodResolver(quizFormSchema),
        defaultValues: {
            title: formValues.title || "",
            description: formValues.description || "",
            categoryId: formValues.categoryId || "",
            thumbnail: formValues.thumbnail || undefined,
            timeMinutes: formValues.timeMinutes || 5,
            difficulty: formValues.difficulty || "Beginner",
            isPublic: formValues.isPublic ?? true,
            passingScore: formValues.passingScore || 0,
            tags: formValues.tags || [],
            questions: formValues.questions || [],
        },
    });

    const handleNextStep = (values: QuizFormValues) => {
        setFormValues(values);
        goToNextStep();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleNextStep)}
                className="space-y-6"
            >
                {form.formState.errors.root && (
                    <div className="bg-red-50 text-red-500 px-3 py-2 rounded-md text-sm">
                        {form.formState.errors.root.message}
                    </div>
                )}

                <QuizBasicDetails
                    form={form}
                    isLoading={false}
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white transition-colors cursor-pointer"
                    >
                        Next
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form>
    );
};
