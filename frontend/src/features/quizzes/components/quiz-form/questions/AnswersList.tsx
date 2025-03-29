import { UseFormReturn, useFieldArray } from "react-hook-form";
import { QuestionFormValues } from "../../../schemas/quizFormSchema";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { AnswerItem } from "./AnswerItem";

interface AnswersListProps {
    form: UseFormReturn<QuestionFormValues>;
}

export const AnswersList = ({ form }: AnswersListProps) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "answers",
    });

    const questionType = form.watch("questionType");
    const answers = form.watch("answers");

    // Ensure at least one answer is marked as correct
    useEffect(() => {
        if (answers && answers.length > 0) {
            const hasCorrectAnswer = answers.some((answer) => answer.isCorrect);
            if (!hasCorrectAnswer) {
                // If no answer is marked as correct, mark the first one
                const updatedAnswers = [...answers];
                updatedAnswers[0] = { ...updatedAnswers[0], isCorrect: true };
                form.setValue("answers", updatedAnswers);
            }
        }
    }, [answers, form]);

    const handleAddAnswer = () => {
        if (fields.length < 6) {
            append({
                text: "",
                isCorrect: false,
                explanation: "",
            });
        }
    };

    return (
        <div className="space-y-4 border rounded-md p-4 bg-gray-50">
            <div className="flex justify-between items-center">
                <h3 className="font-medium">Answers</h3>
                {questionType === "SingleChoice" && fields.length < 6 && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddAnswer}
                        className="flex items-center gap-1"
                    >
                        <PlusIcon size={16} />
                        Add Answer
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <AnswerItem
                        key={field.id}
                        form={form}
                        index={index}
                        disabled={questionType === "TrueFalse"}
                        canDelete={
                            questionType === "SingleChoice" && fields.length > 2
                        }
                        onDelete={() => remove(index)}
                    />
                ))}
            </div>

            {form.formState.errors.answers && (
                <div className="text-sm text-red-500 mt-1">
                    {form.formState.errors.answers.message}
                </div>
            )}
        </div>
    );
};
