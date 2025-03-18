import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { QuizResult } from "@/features/quizzes/contexts/QuizResultsContext";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

interface QuestionReviewProps {
    result: QuizResult;
}

const QuestionReview = ({ result }: QuestionReviewProps) => {
    return (
        <Accordion type="multiple" className="space-y-4">
            {result.questionResults.map((qResult, index) => {
                const {
                    question,
                    selectedOptionId,
                    isCorrect,
                    correctOptionId,
                    explanation,
                } = qResult;

                let statusIcon;
                if (selectedOptionId === undefined) {
                    statusIcon = (
                        <HelpCircle className="h-5 w-5 text-amber-500" />
                    );
                } else if (isCorrect) {
                    statusIcon = (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    );
                } else {
                    statusIcon = <XCircle className="h-5 w-5 text-red-600" />;
                }

                return (
                    <AccordionItem
                        key={question.id}
                        value={question.id}
                        className="border bg-white rounded-lg"
                    >
                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 cursor-pointer rounded-t-lg">
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
                                    {qResult.earnedPoints}/{qResult.points} pts
                                </div>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-6 py-4">
                            <div className="space-y-4">
                                {/* All answers with correct/selected indicators */}
                                <div className="space-y-2">
                                    {question.answers.map((answer) => {
                                        const isSelectedByUser =
                                            answer.id === selectedOptionId;
                                        const isCorrectAnswer =
                                            answer.id === correctOptionId;

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

                                {/* Explanation */}
                                {explanation && (
                                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                                            Explanation:
                                        </h4>
                                        <p className="text-gray-600">
                                            {explanation}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

export default QuestionReview;
