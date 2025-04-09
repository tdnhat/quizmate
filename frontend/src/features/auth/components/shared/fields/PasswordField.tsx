import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { Link } from "react-router-dom";
import PasswordRequirements from "../../register/PasswordRequirements";

interface PasswordFieldProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    isLoading: boolean;
    name?: Path<T>;
    label?: string;
    placeholder?: string;
    showForgotPassword?: boolean;
    showRequirements?: boolean;
}

export const PasswordField = <T extends FieldValues>({ 
    form, 
    isLoading,
    name = "password" as Path<T>,
    label = "Password",
    placeholder = "********",
    showForgotPassword = false,
    showRequirements = false
}: PasswordFieldProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <PasswordInput
                            placeholder={placeholder}
                            disabled={isLoading}
                            autoComplete={name === "password" ? "new-password" : "new-password"}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    {showForgotPassword && (
                        <div className="text-sm text-right">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    )}
                    {showRequirements && (
                        <PasswordRequirements password={field.value} />
                    )}
                </FormItem>
            )}
        />
    );
}; 