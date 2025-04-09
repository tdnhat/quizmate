import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { LoadingButton } from "@/features/auth/components/shared/LoadingButton";
import { FormFooter } from "@/features/auth/components/shared/FormFooter";
import { LoginFormSchema } from "@/features/auth/schemas/loginFormSchema";
import { EmailField, PasswordField } from "../shared/fields";
import { FormError } from "../shared/FormError";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
    returnUrl?: string | null;
}

interface LoginFormValues {
    email: string;
    password: string;
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

    const handleSubmit = async (values: LoginFormValues) => {
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                noValidate
                className="space-y-4"
            >
                <FormError message={form.formState.errors.root?.message} />

                <EmailField form={form} isLoading={isSubmitting} />

                <PasswordField
                    form={form}
                    isLoading={isSubmitting}
                    showForgotPassword={true}
                />

                {/* Submit Button */}
                <LoadingButton
                    isLoading={isSubmitting}
                    loadingText="Logging in..."
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                    Log in
                </LoadingButton>

                {/* Registration link */}
                <FormFooter
                    text="Don't have an account?"
                    linkText="Register"
                    linkTo={
                        joinCode
                            ? `/register?returnUrl=${encodeURIComponent(
                                  `/join/${joinCode}`
                              )}`
                            : "/register"
                    }
                />
            </form>
        </Form>
    );
};

export default LoginForm;
