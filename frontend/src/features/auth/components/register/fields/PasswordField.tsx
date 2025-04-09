import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { RegisterFormValues } from "@/features/auth/schemas/registerFormSchema";
import PasswordRequirements from "../PasswordRequirements";

interface PasswordFieldProps {
    form: UseFormReturn<RegisterFormValues>;
    isLoading: boolean;
    showRequirements?: boolean;
}

export const PasswordField = ({ 
    form, 
    isLoading, 
    showRequirements = false 
}: PasswordFieldProps) => {
    return (
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <PasswordInput
                            placeholder="********"
                            disabled={isLoading}
                            autoComplete="current-password"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    {showRequirements && (
                        <PasswordRequirements password={field.value} />
                    )}
                </FormItem>
            )}
        />
    );
}; 