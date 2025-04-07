import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface Option {
    id: string;
    text: string;
}

interface QuestionOptionsProps {
    options: Option[];
    selectedOption?: string;
    disabled?: boolean;
    showFeedback?: boolean;
    isCorrect?: boolean;
    onSelectOption: (optionId: string) => void;
}

export const QuestionOptions = ({
    options,
    selectedOption,
    disabled = false,
    showFeedback = false,
    isCorrect = false,
    onSelectOption,
}: QuestionOptionsProps) => {
    // For active question
    if (!showFeedback) {
        return (
            <div className="space-y-3">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onSelectOption(option.id)}
                        disabled={disabled}
                        className={cn(
                            "w-full p-4 rounded-md border text-left transition",
                            selectedOption === option.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50 hover:bg-muted"
                        )}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        );
    }
    
    // For feedback display
    return (
        <div className="space-y-2">
            {options.map((option) => {
                // Determine if this is the selected option
                const isSelectedOption = selectedOption === option.id;
                
                let optionClassName = "p-3 rounded-md border";
                
                if (isSelectedOption && isCorrect) {
                    // Selected and correct
                    optionClassName += " bg-green-50 border-green-300";
                } else if (isSelectedOption && !isCorrect) {
                    // Selected but wrong
                    optionClassName += " bg-red-50 border-red-300";
                } else {
                    // Not selected
                    optionClassName += " border-gray-200";
                }
                
                return (
                    <div key={option.id} className={optionClassName}>
                        <div className="flex items-center">
                            <div className="flex-shrink-0 mr-2">
                                {isSelectedOption && isCorrect && (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                                {isSelectedOption && !isCorrect && (
                                    <XCircle className="h-4 w-4 text-red-600" />
                                )}
                            </div>
                            <div className="flex-grow">
                                {option.text}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}; 