import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { LoadingButton } from "@/features/auth/components/LoadingButton";
import { FormFooter } from "@/features/auth/components/FormFooter";
import {
    LoginFormValues,
    LoginFormSchema,
} from "@/features/auth/schemas/loginFormSchema";

interface LoginFormProps {
    returnUrl?: string | null;
}

const LoginForm = ({ returnUrl }: LoginFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    let joinCode = null;
    if (returnUrl && returnUrl.startsWith("/join/")) {
        joinCode = returnUrl.substring(6); // Remove '/join/' to get the code
    }

    useEffect(() => {
        if (isAuthenticated) {
            const destination = returnUrl || "/home";
            navigate(destination, { replace: true });
        }
    }, [isAuthenticated, navigate, returnUrl]);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            setIsSubmitting(true);
            await login(values.email, values.password, returnUrl || undefined);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Login failed:", error.message);
                if (
                    (error as { response?: { status: number } }).response
                        ?.status === 401
                ) {
                    form.setError("root", {
                        type: "manual",
                        message: "Invalid email or password",
                    });
                } else {
                    form.setError("root", {
                        type: "manual",
                        message: "Login failed. Please try again.",
                    });
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                    Log in
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        noValidate
                        className="space-y-4"
                    >
                        {form.formState.errors.root && (
                            <div className="bg-red-50 text-red-500 px-3 py-2 rounded-md text-sm">
                                {form.formState.errors.root.message}
                            </div>
                        )}
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
                                            disabled={isSubmitting}
                                            autoComplete="email"
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
                                            disabled={isSubmitting}
                                            autoComplete="current-password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <div className="text-sm text-right">
                                        <Link
                                            to="/forgot-password"
                                            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <LoadingButton
                            isLoading={isSubmitting}
                            loadingText="Logging in..."
                            className="bg-cyan-500 hover:bg-cyan-600 text-white"
                        >
                            Log in
                        </LoadingButton>

                        {/* Registration link */}
                        <FormFooter
                            text="Don't have an account?"
                            linkText="Register"
                            linkTo={
                                joinCode
                                    ? `/register?returnUrl=${encodeURIComponent(`/join/${joinCode}`)}`
                                    : "/register"
                            }
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
