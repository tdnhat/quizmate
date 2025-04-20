import { Question } from "@/types/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface QuizQuestionPreviewProps {
    question: Question;
    number: number;
}

const QuizQuestionPreview = ({
    question,
    number,
}: QuizQuestionPreviewProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div 
                        className="flex items-center gap-3 cursor-pointer select-none"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-medium text-primary-foreground">
                            {number}
                        </div>
                        <h3 className="font-medium leading-tight flex-1">
                            {question.text}{" "}
                            <span className="text-gray-500 text-sm">
                                {`(${question.points} points)`}
                            </span>
                        </h3>
                        {isCollapsed ? (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                        )}
                    </div>

                    <div className={cn(
                        "transition-all duration-200",
                        isCollapsed ? "hidden" : "block"
                    )}>
                        {question.imageUrl && (
                            <div className="flex justify-center items-center my-2 relative max-h-60 w-full overflow-hidden rounded-md">
                                <img
                                    src={question.imageUrl || "/placeholder.svg"}
                                    alt={`Image for question ${number}`}
                                    className="object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "/placeholder.svg";
                                    }}
                                />
                            </div>
                        )}

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
                </div>
            </CardContent>
        </Card>
    );
};

export default QuizQuestionPreview;
