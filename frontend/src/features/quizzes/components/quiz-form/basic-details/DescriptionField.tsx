import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { QuizFormValues } from "@/features/quizzes/schemas/quizFormSchema";
import { Control } from "react-hook-form";

interface DescriptionFieldProps {
    control: Control<QuizFormValues>;
}

export const DescriptionField = ({ control }: DescriptionFieldProps) => {
    return (
        <FormField
            control={control}
            name="description"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        Description{" "}
                        <span className="text-gray-500">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Give a short description of your quiz..."
                            className="resize-none"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
