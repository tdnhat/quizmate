import QuizHeader from "./take-quiz-main-content/QuizHeader";
import QuestionOverview from "./take-quiz-sidebar/QuestionOverview";
import QuestionDisplay from "./take-quiz-main-content/QuestionDisplay";
import { useEffect } from "react";

const TakeQuizContainer = () => {
    // Move on top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <QuizHeader />

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 flex">
                    <QuestionDisplay />
                </div>

                <aside className="w-full lg:w-[300px] flex-shrink-0">
                    <div className="w-full h-full">
                        <QuestionOverview />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TakeQuizContainer;
