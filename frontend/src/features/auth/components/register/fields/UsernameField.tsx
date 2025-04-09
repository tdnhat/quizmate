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

interface UsernameFieldProps {
    form: UseFormReturn<RegisterFormValues>;
    isLoading: boolean;
}

export const UsernameField = ({ form, isLoading }: UsernameFieldProps) => {
    return (
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="johndoe"
                            type="text"
                            disabled={isLoading}
                            autoComplete="username"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}; 