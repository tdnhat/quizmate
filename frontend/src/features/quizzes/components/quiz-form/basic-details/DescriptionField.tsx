import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { CreateQuizFormValues } from "../../../../../components/shared/schemas/CreateQuizFormSchema";

interface DescriptionFieldProps {
    control: Control<CreateQuizFormValues>;
}

export const DescriptionField = ({ control }: DescriptionFieldProps) => {
    return (
        <FormField
            control={control}
            name="description"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Give a short description of your quiz (optional)..."
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
