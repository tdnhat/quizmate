import { useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuizFormValues } from "@/features/quizzes/schemas/quizFormSchema";
import { Control } from "react-hook-form";
import { Clock } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TimeFieldProps {
    control: Control<QuizFormValues>;
    isLoading: boolean;
}

const TimeField = ({ control, isLoading }: TimeFieldProps) => {
    const [isCustom, setIsCustom] = useState(false);
    const [customValue, setCustomValue] = useState<number>(90);

    const presetOptions = [
        { label: "5 min", value: 5 },
        { label: "15 min", value: 15 },
        { label: "30 min", value: 30 },
        { label: "45 min", value: 45 },
        { label: "60 min", value: 60 },
        { label: "Custom...", value: "custom" },
    ];

    return (
        <FormField
            control={control}
            name="timeMinutes"
            render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel>
                        Duration{" "}
                        <span className="text-gray-500">(minutes)</span>
                    </FormLabel>
                    <div className="flex gap-2 items-center">
                        <Select
                            disabled={isLoading}
                            onValueChange={(value) => {
                                if (value === "custom") {
                                    setIsCustom(true);
                                    field.onChange(customValue);
                                } else {
                                    setIsCustom(false);
                                    field.onChange(Number(value));
                                }
                            }}
                            value={
                                isCustom
                                    ? "custom"
                                    : field.value?.toString() || "15"
                            }
                        >
                            <FormControl>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {presetOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value.toString()}
                                        className="flex justify-between items-center"
                                    >
                                        <span>{option.label}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {isCustom && (
                            <div className="relative w-24">
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={120}
                                        disabled={isLoading}
                                        value={customValue}
                                        onChange={(e) => {
                                            const value = Number(
                                                e.target.value
                                            );
                                            if (value >= 1 && value <= 120) {
                                                setCustomValue(value);
                                                field.onChange(value);
                                            }
                                        }}
                                        className="pr-10"
                                    />
                                </FormControl>
                                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TimeField;
