import { RadioGroup } from "@/components/ui/radio-group";
import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";
import AnswerOption from "./AnswerOption";

const AnswersList = () => {
    const { getCurrentQuestion, submitAnswer, getSelectedOptionId } =
        useTakeQuiz();

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return null;

    const selectedOptionId = getSelectedOptionId(currentQuestion.id);

    return (
        <div className="pl-11">
            <RadioGroup
                value={selectedOptionId || ""}
                onValueChange={(value) =>
                    submitAnswer(currentQuestion.id, value)
                }
                className="space-y-3"
            >
                {currentQuestion.answers.map((answer) => (
                    <AnswerOption
                        key={answer.id}
                        answer={answer}
                        isSelected={selectedOptionId === answer.id}
                    />
                ))}
            </RadioGroup>
        </div>
    );
};

export default AnswersList;
