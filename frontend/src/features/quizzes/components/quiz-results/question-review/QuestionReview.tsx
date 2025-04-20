import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useQuizResults } from "@/features/quizzes/hooks/useQuizResults";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getQuestionReviewData } from "@/features/quizzes/utils";

const QuestionReview = () => {
    const { quizResult } = useQuizResults();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    if (!quizResult) {
        return <div>No results available</div>;
    }

    // Find matching questions from the quiz
    const allQuestionIds = quizResult.resultAnswers.map((ra) => ra.questionId);

    // Toggle all questions expand/collapse
    const toggleAllQuestions = () => {
        if (expandedItems.length === allQuestionIds.length) {
            // If all are expanded, collapse all
            setExpandedItems([]);
        } else {
            // Otherwise expand all
            setExpandedItems([...allQuestionIds]);
        }
    };

    // Handle individual item change
    const handleItemToggle = (itemValue: string) => {
        setExpandedItems((prev) => {
            if (prev.includes(itemValue)) {
                return prev.filter((item) => item !== itemValue);
            } else {
                return [...prev, itemValue];
            }
        });
    };

    console.log(quizResult);

    const areAllExpanded =
        expandedItems.length === allQuestionIds.length &&
        allQuestionIds.length > 0;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-cyan-600">Question Review</h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAllQuestions}
                    className="flex items-center w-32 gap-2 cursor-pointer"
                >
                    {areAllExpanded ? (
                        <>
                            Collapse All
                            <ChevronUp className="h-4 w-4" />
                        </>
                    ) : (
                        <>
                            Expand All
                            <ChevronDown className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>

            <Accordion
                type="multiple"
                className="space-y-4"
                value={expandedItems}
                onValueChange={setExpandedItems}
            >
                {quizResult.quiz.questions.map((question, index) => {
                    const { answerId, correctAnswerId, statusIcon, earnedPoints } =
                        getQuestionReviewData(
                            question,
                            quizResult.resultAnswers
                        );

                    return (
                        <AccordionItem
                            key={question.id}
                            value={question.id}
                            className="border bg-white rounded-lg"
                        >
                            <AccordionTrigger
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer rounded-t-lg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleItemToggle(question.id);
                                }}
                            >
                                <div className="flex items-center w-full">
                                    <div className="flex-shrink-0 mr-3">
                                        {statusIcon}
                                    </div>
                                    <div className="flex-grow text-left">
                                        <span className="text-gray-500 mr-2">
                                            Question {index + 1}:
                                        </span>
                                        <span>{question.text}</span>
                                    </div>
                                    <div className="flex-shrink-0 text-gray-500 ml-3">
                                        {earnedPoints}/{question.points} pts
                                    </div>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="px-6 py-4">
                                <div className="space-y-4">
                                    {question.imageUrl && (
                                        <div className="mt-2 relative max-h-60 w-full overflow-hidden rounded-md">
                                            <img
                                                src={question.imageUrl}
                                                alt={`Image for question ${index + 1}`}
                                                className="object-contain max-w-full max-h-60 mx-auto"
                                                onError={(e) => {
                                                    const target =
                                                        e.target as HTMLImageElement;
                                                    target.style.display =
                                                        "none";
                                                }}
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        {question.answers.map((answer) => {
                                            const isSelectedByUser =
                                                answer.id === answerId;
                                            const isCorrectAnswer =
                                                answer.id === correctAnswerId;

                                            let answerClassName =
                                                "p-3 rounded-md border";
                                            if (
                                                isSelectedByUser &&
                                                isCorrectAnswer
                                            ) {
                                                answerClassName +=
                                                    " bg-green-50 border-green-300";
                                            } else if (
                                                isSelectedByUser &&
                                                !isCorrectAnswer
                                            ) {
                                                answerClassName +=
                                                    " bg-red-50 border-red-300";
                                            } else if (isCorrectAnswer) {
                                                answerClassName +=
                                                    " bg-green-50 border-green-300";
                                            } else {
                                                answerClassName +=
                                                    " border-gray-200";
                                            }

                                            return (
                                                <div
                                                    key={answer.id}
                                                    className={answerClassName}
                                                >
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 mr-2">
                                                            {isSelectedByUser &&
                                                                isCorrectAnswer && (
                                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                                )}
                                                            {isSelectedByUser &&
                                                                !isCorrectAnswer && (
                                                                    <XCircle className="h-4 w-4 text-red-600" />
                                                                )}
                                                            {!isSelectedByUser &&
                                                                isCorrectAnswer && (
                                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                                )}
                                                        </div>
                                                        <div className="flex-grow">
                                                            {answer.text}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {question.explanation && (
                                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                                                Explanation:
                                            </h4>
                                            <p className="text-gray-600">
                                                {question.explanation}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
};

export default QuestionReview;
