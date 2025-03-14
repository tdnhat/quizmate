import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AnswerOptionProps {
    answer: {
        id: string;
        text: string;
    };
    isSelected: boolean;
}

const AnswerOption = ({ answer, isSelected }: AnswerOptionProps) => {
    return (
        <div
            className={`flex items-center space-x-2 rounded-md border px-3 transition-colors ${
                isSelected ? "border-cyan-500 bg-cyan-50" : "hover:bg-muted/50"
            }`}
        >
            <RadioGroupItem value={answer.id} id={answer.id} className="" />
            <Label htmlFor={answer.id} className="flex-grow cursor-pointer p-3">
                {answer.text}
            </Label>
        </div>
    );
};

export default AnswerOption;
