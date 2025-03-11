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

interface TimeFieldProps {
    control: Control<CreateQuizFormValues>;
    isLoading: boolean;
}

const TimeField = ({ control, isLoading }: TimeFieldProps) => {
    return (
        <FormField
            control={control}
            name="timeMinutes"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Time (minutes)</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Enter the time limit..."
                            type="number"
                            disabled={isLoading}
                            {...field}
                            onChange={(e) =>
                                field.onChange(Number(e.target.value))
                            }
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TimeField;
