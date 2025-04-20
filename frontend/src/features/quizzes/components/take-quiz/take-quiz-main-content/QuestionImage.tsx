import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";

const QuestionImage = () => {
    const { getCurrentQuestion, currentQuestionIndex } = useTakeQuiz();
    const currentQuestion = getCurrentQuestion();
    
    if (!currentQuestion?.imageUrl) return null;
    
    return (
        <div className="flex justify-center items-center my-2 relative max-h-60 w-full overflow-hidden rounded-md">
            <img
                src={currentQuestion.imageUrl || "/placeholder.svg"}
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