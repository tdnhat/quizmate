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

interface TitleFieldProps {
    control: Control<QuizFormValues>;
    isLoading: boolean;
}

export const TitleField = ({ control, isLoading }: TitleFieldProps) => {
    return (
        <FormField
            control={control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Enter quiz title..."
                            type="text"
                            disabled={isLoading}
                            autoComplete="title"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};