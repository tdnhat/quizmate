import { CreateQuizFormValues } from "./NavbarCreate";
import { Control } from "react-hook-form";
import { Category } from "@/types/category";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface CategoryField {
    control: Control<CreateQuizFormValues>;
    categories: Category[];
    isLoading: boolean;
}

const CategoryField = ({ control, categories, isLoading }: CategoryField) => {
    return (
        <FormField
            control={control}
            name="category"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                        <select
                            className={cn(
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                            disabled={isLoading}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                        >
                            <option value="">Select category</option>
                            {Array.isArray(categories) &&
                                categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CategoryField;
