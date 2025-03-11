import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { CreateQuizFormValues } from "../../schemas/CreateQuizFormSchema";

interface TitleFieldProps {
    control: Control<CreateQuizFormValues>;
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
                            placeholder="Enter a catchy quiz title... (e.g., JavaScript Basics)"
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