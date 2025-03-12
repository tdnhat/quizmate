import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, PlusCircleIcon, Pencil, Trash2 } from "lucide-react";
import { useQuizForm } from "../../hooks/useQuizForm";
import { QuestionFormValues } from "../../schemas/quizFormSchema";
import { QuestionsForm } from "./questions/QuestionsForm";

export const QuestionsStep = () => {
    const { questions, removeQuestion, goToNextStep, goToPreviousStep } = useQuizForm();
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | undefined>(undefined);

    const handleAddQuestion = () => {
        setEditingQuestionIndex(undefined);
        setShowQuestionForm(true);
    };

    const handleEditQuestion = (index: number) => {
        setEditingQuestionIndex(index);
        setShowQuestionForm(true);
    };

    const handleDeleteQuestion = (index: number) => {
        removeQuestion(index);
    };

    const handleFormComplete = () => {
        setShowQuestionForm(false);
        setEditingQuestionIndex(undefined);
    };

    const getInitialValues = (): QuestionFormValues | undefined => {
        if (editingQuestionIndex !== undefined) {
            return questions[editingQuestionIndex];
        }
        return undefined;
    };

    return (
        <div className="space-y-6">
            {!showQuestionForm ? (
                <>
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium">Questions</h2>
                        <Button
                            type="button"
                            onClick={handleAddQuestion}
                            className="flex items-center gap-1 bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
                        >
                            <PlusCircleIcon size={16} />
                            Add Question
                        </Button>
                    </div>

                    {questions.length === 0 ? (
                        <div className="text-center py-8 border border-dashed rounded-md">
                            <p className="text-gray-500">No questions added yet.</p>
                            <p className="text-gray-500 text-sm">
                                Start by adding your first question.
                            </p>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleAddQuestion}
                                className="mt-4"
                            >
                                <PlusCircleIcon size={16} className="mr-1" />
                                Add Question
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {questions.map((question, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 p-4 rounded-md border flex justify-between"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">Q{index + 1}:</span>
                                            <span>{question.text}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {question.type === "multiple-choice"
                                                ? "Multiple Choice"
                                                : "True/False"} • {question.points} {question.points === 1 ? "point" : "points"} • {question.answers.length} options
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEditQuestion(index)}
                                        >
                                            <Pencil size={16} />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteQuestion(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between pt-4">
                        <Button
                            type="button"
                            onClick={goToPreviousStep}
                            variant="outline"
                            className="flex items-center"
                        >
                            <ChevronLeftIcon className="mr-2 h-4 w-4" />
                            Back to Details
                        </Button>

                        <Button
                            type="button"
                            onClick={goToNextStep}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white transition-colors flex items-center"
                            disabled={questions.length === 0}
                        >
                            Review
                            <ChevronRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </>
            ) : (
                <QuestionsForm
                    onComplete={handleFormComplete}
                    initialValues={getInitialValues()}
                    editIndex={editingQuestionIndex}
                />
            )}
        </div>
    );
};