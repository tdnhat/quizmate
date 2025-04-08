import { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuizFormValues } from "@/features/quizzes/schemas/quizFormSchema";
interface PassingScoreFieldProps {
    control: Control<QuizFormValues>;
}

export function PassingScoreField({ control }: PassingScoreFieldProps) {
    return (
        <FormField
            control={control}
            name="passingScore"
            render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel>
                        Passing Score{" "}
                        <span className="text-sm text-gray-500">(%)</span>
                    </FormLabel>
                    <FormControl>
                        <Input
                            type="number"
                            min={0}
                            max={100}
                            className="w-24"
                            placeholder="0"
                            {...field}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value >= 0 && value <= 100) {
                                    field.onChange(value);
                                }
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
