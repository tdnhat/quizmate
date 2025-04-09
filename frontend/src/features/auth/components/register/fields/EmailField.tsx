import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormValues } from "@/features/auth/schemas/registerFormSchema";

interface EmailFieldProps {
    form: UseFormReturn<RegisterFormValues>;
    isLoading: boolean;
}

export const EmailField = ({ form, isLoading }: EmailFieldProps) => {
    return (
        <FormField
            control={form.control}
            name="email"
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