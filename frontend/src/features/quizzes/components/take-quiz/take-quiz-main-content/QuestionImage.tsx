import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";

const QuestionImage = () => {
    const { getCurrentQuestion, currentQuestionIndex } = useTakeQuiz();
    const currentQuestion = getCurrentQuestion();
    
    if (!currentQuestion?.image) return null;
    
    return (
        <div className="mt-2 ml-11 relative h-40 w-full overflow-hidden rounded-md">
            <img
                src={currentQuestion.image || "/placeholder.svg"}
                alt={`Image for question ${currentQuestionIndex + 1}`}
                className="object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                }}
            />
        </div>
    );
};

export default QuestionImage;