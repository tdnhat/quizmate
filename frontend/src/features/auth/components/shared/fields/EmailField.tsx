import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EmailFieldProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    isLoading: boolean;
}

export const EmailField = <T extends FieldValues>({ 
    form, 
    isLoading 
}: EmailFieldProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={"email" as Path<T>}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="example@email.com"
                            type="email"
                            disabled={isLoading}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
