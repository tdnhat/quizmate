import { Question } from "@/types/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizQuestionPreviewProps {
    question: Question;
    number: number;
}

const QuizQuestionPreview = ({
    question,
    number,
}: QuizQuestionPreviewProps) => {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                            {number}
                        </div>
                        <div>
                            <h3 className="font-medium leading-tight">
                                {question.text}{" "}
                                <span className="text-gray-500 text-sm">
                                    {`(${question.points} points)`}
                                </span>
                            </h3>
                            {question.image && (
                                <div className="mt-2 relative h-40 w-full overflow-hidden rounded-md">
                                    <img
                                        src={
                                            question.image || "/placeholder.svg"
                                        }
                                        alt={`Image for question ${number}`}
                                        className="object-cover"
                                        onError={(e) => {
                                            const target =
                                                e.target as HTMLImageElement;
                                            target.src = "/placeholder.svg";
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pl-11">
                        <RadioGroup disabled className="space-y-2">
                            {question.answers.map((answer) => (
                                <div
                                    key={answer.id}
                                    className="flex items-center space-x-2 rounded-md border p-3"
                                >
                                    <RadioGroupItem
                                        value={answer.id}
                                        id={answer.id}
                                    />
                                    <Label
                                        htmlFor={answer.id}
                                        className="flex-grow cursor-pointer"
                                    >
                                        {answer.text}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuizQuestionPreview;
