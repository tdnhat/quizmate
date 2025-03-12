import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateQuizFormValues } from "../../../../../components/shared/schemas/CreateQuizFormSchema";

interface DifficultyFieldProps {
    control: Control<CreateQuizFormValues>;
        isLoading: boolean;
};

const DifficultyField = ({ control, isLoading }: DifficultyFieldProps) => {
    return (
        <FormField
            control={control}
            name="difficulty"
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel>Difficulty</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                            disabled={isLoading}
                        >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value="Beginner" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                    Beginner
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value="Intermediate" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                    Intermediate
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value="Advanced" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                    Advanced
                                </FormLabel>
                            </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DifficultyField;
