import { Control } from "react-hook-form";
import { Category } from "@/types/category";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { QuizFormValues } from "@/features/quizzes/schemas/quizFormSchema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CategoryFieldProps {
    control: Control<QuizFormValues>;
    categories: Category[];
    isLoading: boolean;
}

const CategoryField = ({
    control,
    categories,
    isLoading,
}: CategoryFieldProps) => {
    return (
        <FormField
            control={control}
            name="category"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="mb-2">Category</FormLabel>
                    <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger
                                className="w-48"
                            >
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>{" "}
                        <SelectContent>
                            {!Array.isArray(categories) ||
                            categories.length === 0 ? (
                                <SelectItem value="loading" disabled>
                                    No categories available
                                </SelectItem>
                            ) : (
                                categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                        className="flex items-center justify-between"
                                    >
                                        <span>{category.name}</span>
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CategoryField;
