import QuizHeader from "./take-quiz-main-content/QuizHeader";
import QuestionOverview from "./take-quiz-sidebar/QuestionOverview";
import QuestionDisplay from "./take-quiz-main-content/QuestionDisplay";
import { useTakeQuiz } from "../../hooks/useTakeQuiz";

const TakeQuizContainer = () => {
    const { quiz, getCurrentQuestion } = useTakeQuiz();

    const currentQuestion = getCurrentQuestion();

    if (!currentQuestion) return null;
    return (
        <div className="space-y-4 max-w-6xl mx-auto">
            <div>
                <QuizHeader title={quiz.title} />
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <QuestionDisplay />
                </div>

                <aside className="w-full md:w-[300px] flex-shrink-0">
                    <QuestionOverview />
                </aside>
            </div>
        </div>
    );
};

export default TakeQuizContainer;
