import QuizHeader from "./take-quiz-main-content/QuizHeader";
import QuestionOverview from "./take-quiz-sidebar/QuestionOverview";
import QuestionDisplay from "./take-quiz-main-content/QuestionDisplay";

const TakeQuizContainer = () => {

    return (
        <div className="max-w-6xl mx-auto">
            <QuizHeader />

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex">
                    <QuestionDisplay />
                </div>

                <aside className="w-full md:w-[300px] flex-shrink-0">
                    <div className="w-full h-full">
                        <QuestionOverview />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TakeQuizContainer;
