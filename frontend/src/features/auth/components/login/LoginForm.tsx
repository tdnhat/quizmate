import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { LoadingButton } from "@/features/auth/components/LoadingButton";
import { FormFooter } from "@/features/auth/components/FormFooter";

const LoginFormSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const from = (location.state as any)?.from || "/dashboard";

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            setIsLoading(true);
            console.log(values);
            await login(values.username, values.password);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error("Login failed:", error);
            form.setError("root", {
                type: "manual",
                message: "Invalid username or password",
            });
        } finally {
            setIsLoading(false);
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
                            isLoading={isLoading}
                            loadingText="Logging in..."
                            className="bg-cyan-500 hover:bg-cyan-600 text-white"
                        >
                            Log in
                        </LoadingButton>

                        {/* Registration link */}
                        <FormFooter
                            text="Don't have an account?"
                            linkText="Register"
                            linkTo="/register"
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
