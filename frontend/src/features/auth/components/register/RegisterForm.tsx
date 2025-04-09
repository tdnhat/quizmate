import { useAuth } from "@/features/auth/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FormError } from "@/features/auth/components/FormError";
import { FormFooter } from "@/features/auth/components/FormFooter";
import { LoadingButton } from "@/features/auth/components/LoadingButton";
import {
    RegisterFormSchema,
    RegisterFormValues,
} from "../../schemas/registerFormSchema";
import { useEffect } from "react";
import { RegisterFormProps, ApiError } from "../../types";
import { handleRegisterError } from "../../utils";
import {
    EmailField,
    UsernameField,
    PasswordField,
    TermsField,
} from "./fields";

const RegisterForm = ({ returnUrl }: RegisterFormProps) => {
    const { register, isLoading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const destination = returnUrl || "/home";
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
            await register(
                values.username,
                values.email,
                values.password,
                values.confirmPassword,
                returnUrl || undefined
            );
        } catch (error) {
            handleRegisterError(error as ApiError, form);
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-cyan-600 font-bold text-center">
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
                        
                        <EmailField form={form} isLoading={isLoading} />
                        <UsernameField form={form} isLoading={isLoading} />
                        <PasswordField form={form} isLoading={isLoading} showRequirements={true} />
                        
                        {/* Confirm Password Field */}
                        <PasswordField 
                            form={form} 
                            isLoading={isLoading} 
                            showRequirements={false}
                        />
                        
                        <TermsField form={form} isLoading={isLoading} />

                        {/* Submit Button */}
                        <LoadingButton
                            isLoading={isLoading}
                            loadingText="Registering..."
                            className="bg-cyan-600 hover:bg-cyan-700 text-white"
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
