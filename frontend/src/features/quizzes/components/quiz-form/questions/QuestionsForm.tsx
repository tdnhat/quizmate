import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQuizForm } from "../../../hooks/useQuizForm";
import { 
    questionFormSchema, 
    QuestionFormValues, 
    AnswerFormValues 
} from "../../../schemas/quizFormSchema";
import { ChevronLeftIcon } from "lucide-react";
import { QuestionDetails } from "./QuestionDetails";
import { AnswersList } from "./AnswersList";

interface QuestionsFormProps {
    initialValues?: QuestionFormValues;
    editIndex?: number;
    onComplete: () => void;
}

export const QuestionsForm = ({ initialValues, editIndex, onComplete }: QuestionsFormProps) => {
    const { addQuestion, updateQuestion } = useQuizForm();
    
    const form = useForm<QuestionFormValues>({
        resolver: zodResolver(questionFormSchema),
        defaultValues: initialValues || {
            text: "",
            questionType: "SingleChoice",
            points: 1,
            answers: [],
            imageUrl: undefined,
            explanation: ""
        },
    });

    const questionType = form.watch("questionType");

    // When type changes to true-false, reset answers
    useEffect(() => {
        if (questionType === "TrueFalse") {
            const currentAnswers = form.getValues("answers");
            if (currentAnswers.length !== 2 || 
                currentAnswers[0].text.toLowerCase() !== "true" || 
                currentAnswers[1].text.toLowerCase() !== "false") {
                
                const trueAnswer: AnswerFormValues = { 
                    text: "True", 
                    isCorrect: false,
                    explanation: "" 
                };
                
                const falseAnswer: AnswerFormValues = { 
                    text: "False", 
                    isCorrect: false,
                    explanation: "" 
                };
                
                form.setValue("answers", [trueAnswer, falseAnswer]);
            }
        }
    }, [questionType, form]);

    const handleSubmit = (values: QuestionFormValues) => {
        if (editIndex !== undefined) {
            updateQuestion(editIndex, values);
        } else {
            addQuestion(values);
        }
        onComplete();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {form.formState.errors.root && (
                    <div className="bg-red-50 text-red-500 px-3 py-2 rounded-md text-sm">
                        {form.formState.errors.root.message}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="flex items-center">
                        <Button 
                            type="button" 
                            variant="ghost" 
                            className="mr-2" 
                            onClick={onComplete}
                        >
                            <ChevronLeftIcon size={18} />
                        </Button>
                        <h2 className="text-lg font-medium">
                            {editIndex !== undefined ? "Edit Question" : "Add Question"}
                        </h2>
                    </div>
                    
                    <QuestionDetails form={form} />
                    
                    <AnswersList form={form} />
                    
                    <div className="flex justify-end gap-3">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={onComplete}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
                        >
                            {editIndex !== undefined ? "Update Question" : "Add Question"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};