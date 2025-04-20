import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettingsContext } from "../contexts/SettingsContext";
import {
    passwordChangeSchema,
    PasswordChangeValues,
} from "../schemas/settingsSchema";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import PasswordRequirements from "@/features/auth/components/register/PasswordRequirements";
import { AxiosError } from "axios";
import { LoadingButton } from "@/features/auth/components/shared/LoadingButton";

interface BackendValidationError {
    [key: string]: string[];
}

interface PasswordSectionProps {
    labelPosition?: "top" | "left";
}

export const PasswordSection = ({ labelPosition = "top" }: PasswordSectionProps) => {
    const { changePassword, isChangingPassword } = useSettingsContext();
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [hasValues, setHasValues] = useState(false);

    const form = useForm<PasswordChangeValues>({
        resolver: zodResolver(passwordChangeSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    // Watch form values to detect changes
    const watchedValues = form.watch();
    
    // Check if any field has values
    useEffect(() => {
        const hasCurrentPassword = watchedValues.currentPassword.trim() !== "";
        const hasNewPassword = watchedValues.newPassword.trim() !== "";
        const hasConfirmPassword = watchedValues.confirmPassword.trim() !== "";
        
        setHasValues(hasCurrentPassword && hasNewPassword && hasConfirmPassword);
    }, [watchedValues]);

    const onSubmit = async (data: PasswordChangeValues) => {
        try {
            await changePassword(data);
            form.reset();
            setHasValues(false);
        } catch (error) {
            console.error("Password change failed:", error);
            
            // Handle backend validation errors
            if (error instanceof AxiosError && error.response?.status === 400) {
                const validationErrors = error.response.data as BackendValidationError;
                
                // Set field errors from the backend
                Object.entries(validationErrors).forEach(([field, messages]) => {
                    const fieldName = field.charAt(0).toLowerCase() + field.slice(1);
                    if (field === "CurrentPassword" || fieldName === "currentPassword") {
                        form.setError("currentPassword", {
                            type: "manual",
                            message: messages[0]
                        });
                    } else if (field === "NewPassword" || fieldName === "newPassword") {
                        form.setError("newPassword", {
                            type: "manual",
                            message: messages[0]
                        });
                    } else if (field === "ConfirmPassword" || fieldName === "confirmPassword") {
                        form.setError("confirmPassword", {
                            type: "manual",
                            message: messages[0]
                        });
                    } else {
                        // For any other field errors that don't map directly to form fields
                        form.setError("root", {
                            type: "manual",
                            message: Array.isArray(messages) ? messages[0] : String(messages)
                        });
                    }
                });
            }
        }
    };

    const togglePasswordVisibility = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const renderPasswordInput = (
        field: { value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; onBlur: () => void; name: string; ref: React.Ref<HTMLInputElement> }, 
        type: keyof typeof showPassword, 
        placeholder: string, 
        showRequirements = false
    ) => (
        <div className="relative">
            <Input 
                type={showPassword[type] ? 'text' : 'password'} 
                placeholder={placeholder} 
                {...field} 
                disabled={isChangingPassword}
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => togglePasswordVisibility(type)}
                aria-label={showPassword[type] ? 'Hide password' : 'Show password'}
                tabIndex={-1}
            >
                {showPassword[type] ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
            </button>
            {showRequirements && (
                <PasswordRequirements password={field.value} />
            )}
        </div>
    );

    if (labelPosition === "left") {
        // Two-column layout with labels on the left
        return (
            <div className="w-full">
                {form.formState.errors.root && (
                    <div className="p-3 mb-4 rounded-md bg-destructive/15 text-destructive text-sm">
                        {form.formState.errors.root.message}
                    </div>
                )}
                
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 w-full"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                        <FormLabel className="text-right md:mb-0">Current Password</FormLabel>
                                        <div className="md:col-span-2">
                                            <FormControl>
                                                {renderPasswordInput(field, "current", "Enter your current password")}
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                                        <FormLabel className="text-right md:mt-2">New Password</FormLabel>
                                        <div className="md:col-span-2">
                                            <FormControl>
                                                {renderPasswordInput(field, "new", "Enter your new password", true)}
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                        <FormLabel className="text-right md:mb-0">Confirm Password</FormLabel>
                                        <div className="md:col-span-2">
                                            <FormControl>
                                                {renderPasswordInput(field, "confirm", "Confirm your new password")}
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end mt-6">
                            <LoadingButton
                                type="submit"
                                disabled={isChangingPassword || !hasValues}
                                isLoading={isChangingPassword}
                                loadingText="Changing password..."
                                className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white transition-colors duration-300"
                            >
                                Change Password
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </div>
        );
    }

    // Default: labels on top (original layout)
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-cyan-600">Change Password</CardTitle>
                <CardDescription>
                    Change your password to keep your account secure
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {form.formState.errors.root && (
                            <div className="p-3 mb-4 rounded-md bg-destructive/15 text-destructive text-sm">
                                {form.formState.errors.root.message}
                            </div>
                        )}
                        
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        {renderPasswordInput(field, "current", "Enter your current password")}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        {renderPasswordInput(field, "new", "Enter your new password", true)}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        {renderPasswordInput(field, "confirm", "Confirm your new password")}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end mt-6">
                            <LoadingButton
                                type="submit"
                                disabled={isChangingPassword || !hasValues}
                                isLoading={isChangingPassword}
                                loadingText="Changing password..."
                                className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white transition-colors duration-300"
                            >
                                Change Password
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
