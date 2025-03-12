import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateQuizFormValues } from "../../../../../components/shared/schemas/CreateQuizFormSchema";

interface ThumbnailFieldProps {
    control: Control<CreateQuizFormValues>;
    isLoading: boolean;
}
const ThumbnailField = ({ control, isLoading }: ThumbnailFieldProps) => {
    return (
        <FormField
            control={control}
            name="thumbnail"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Enter a thumbnail URL... (optional)"
                            type="text"
                            disabled={isLoading}
                            autoComplete="thumbnail"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ThumbnailField;
