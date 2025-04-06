import { useAuth } from "@/features/auth/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { FormError } from "@/features/auth/components/FormError";
import { FormFooter } from "@/features/auth/components/FormFooter";
import { LoadingButton } from "@/features/auth/components/LoadingButton";
import {
    RegisterFormSchema,
    RegisterFormValues,
} from "../../schemas/registerFormSchema";
import { useEffect } from "react";
interface RegisterFormProps {
    returnUrl?: string | null;
}

const RegisterForm = ({ returnUrl }: RegisterFormProps) => {
    const { register, isLoading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(`[RegisterForm.tsx] isAuthenticated: ${isAuthenticated}, returnUrl: ${returnUrl}`);
        if (isAuthenticated) {
            const destination = returnUrl || "/home";
            console.log(`[RegisterForm.tsx] Navigating to: ${destination}`);
            navigate(destination, { replace: true });
        }
    }, [isAuthenticated, navigate, returnUrl]);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        try {
            console.log(`[RegisterForm.tsx] Submitting registration with returnUrl: ${returnUrl}`);
            await register(
                values.username,
                values.email,
                values.password,
                values.confirmPassword,
                returnUrl || undefined
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Registration failed:", error);
            console.log("Full error response:", error.response?.data);

            if (Array.isArray(error.response?.data)) {
                const duplicateUserError = error.response.data.find(
                    (err: { code: string }) => err.code === "DuplicateUserName"
                );

                if (duplicateUserError) {
                    form.setError("username", {
                        type: "manual",
                        message:
                            duplicateUserError.description ||
                            "This username is already taken.",
                    });
                    return;
                }
            }

            if (error.response?.status === 409) {
                form.setError("email", {
                    type: "manual",
                    message: "This email is already registered",
                });
            } else if (error.response?.data?.errors?.ConfirmPassword) {
                form.setError("confirmPassword", {
                    type: "manual",
                    message: error.response.data.errors.ConfirmPassword[0],
                });
            } else {
                form.setError("root", {
                    type: "manual",
                    message: "Registration failed. Please try again.",
                });
            }
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                    Create an account
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormError
                            message={form.formState.errors.root?.message}
                        />
                        {/* Username Field */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Username"
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

                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            type="email"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Password"
                                            disabled={isLoading}
                                            autoComplete="current-password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password Confirmation Field */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Confirm Password"
                                            disabled={isLoading}
                                            autoComplete="current-password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Terms & Conditions Checkbox */}
                        <FormField
                            control={form.control}
                            name="acceptTerms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <p className="font-normal text-sm">
                                            I agree to the{" "}
                                            <Link
                                                to="/terms"
                                                className="text-indigo-600 hover:text-indigo-500 hover:underline"
                                                target="_blank"
                                            >
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link
                                                to="/privacy"
                                                className="text-indigo-600 hover:text-indigo-500 hover:underline"
                                                target="_blank"
                                            >
                                                Privacy Policy
                                            </Link>
                                        </p>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <LoadingButton
                            isLoading={isLoading}
                            loadingText="Registering..."
                            className="bg-cyan-500 hover:bg-cyan-600 text-white"
                        >
                            Register
                        </LoadingButton>

                        {/* Login link */}
                        <FormFooter
                            text="Already have an account?"
                            linkText="Log in"
                            linkTo="/login"
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default RegisterForm;
