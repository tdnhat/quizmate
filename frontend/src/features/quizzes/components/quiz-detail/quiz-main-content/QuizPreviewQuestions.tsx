import { Question } from "@/types/quiz";
import QuizQuestionPreview from "./PreviewQuestionItem";

interface QuizPreviewQuestionsProps {
    questions: Question[] | undefined;
}

const QuizPreviewQuestions = ({ questions }: QuizPreviewQuestionsProps) => {
        return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Quiz Preview</h2>
            <div className="space-y-4">
                    {questions &&
                        questions
                            .slice(0, 2)
                            .map((question, index) => (
                            <QuizQuestionPreview
                                key={question.id}
                                question={question}
                                number={index + 1}
                            />
                        ))}
                <div className="text-center mt-6">
                    <p className="text-gray-500 mb-2">
                        {questions && questions.length > 2
                            ? `+ ${questions.length - 2} more questions`
                            : "Start the quiz to see all questions"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuizPreviewQuestions;
