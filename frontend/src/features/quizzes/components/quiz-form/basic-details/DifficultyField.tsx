import { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { QuizFormValues } from "@/features/quizzes/schemas/quizFormSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import clsx from "clsx";

interface DifficultyFieldProps {
    control: Control<QuizFormValues>;
    isLoading: boolean;
}

const difficultyOptions = [
    {
        value: "Beginner",
        label: "Beginner",
        image: "/quizzes/difficulty-level/easy.svg",
    },
    {
        value: "Intermediate",
        label: "Intermediate",
        image: "/quizzes/difficulty-level/medium.svg",
    },
    {
        value: "Advanced",
        label: "Advanced",
        image: "/quizzes/difficulty-level/hard.svg",
    },
];

const DifficultyField = ({ control, isLoading }: DifficultyFieldProps) => {
    return (
        <FormField
            control={control}
            name="difficulty"
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel>Difficulty Level</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-3 gap-4"
                            disabled={isLoading}
                        >
                            {difficultyOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={clsx(
                                        "relative flex flex-col items-center justify-center space-y-2 p-3 rounded-lg border transition-all",
                                        field.value === option.value
                                            ? "border-cyan-500 bg-cyan-50"
                                            : "border-gray-300 hover:border-gray-400"
                                    )}
                                >
                                    {/* Position the actual radio input on top to capture clicks */}
                                    <RadioGroupItem
                                        value={option.value}
                                        id={`difficulty-${option.value}`}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />

                                    <img
                                        src={option.image}
                                        alt={option.label}
                                        className="h-8 pointer-events-none"
                                    />
                                    <span className="font-medium text-cyan-600 tracking-wide pointer-events-none">
                                        {option.label}
                                    </span>
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DifficultyField;
