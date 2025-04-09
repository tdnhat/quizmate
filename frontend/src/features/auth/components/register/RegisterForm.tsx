import { useAuth } from "@/features/auth/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { FormError } from "@/features/auth/components/shared/FormError";
import { FormFooter } from "@/features/auth/components/shared/FormFooter";
import { LoadingButton } from "@/features/auth/components/shared/LoadingButton";
import {
    RegisterFormSchema,
    RegisterFormValues,
} from "../../schemas/registerFormSchema";
import { useEffect } from "react";
import { handleRegisterError } from "../../utils";
import { UsernameField, TermsField } from "./fields";
import { EmailField, PasswordField } from "../shared/fields";
import { ApiError } from "../../types";

// Form Props
interface RegisterFormProps {
    returnUrl?: string | null;
}

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormError message={form.formState.errors.root?.message} />

                <EmailField form={form} isLoading={isLoading} />
                <UsernameField form={form} isLoading={isLoading} />
                
                {/* Password Fields */}
                <PasswordField
                    form={form}
                    isLoading={isLoading}
                    name="password"
                    label="Password"
                    showRequirements={true}
                />
                <PasswordField
                    form={form}
                    isLoading={isLoading}
                    name="confirmPassword"
                    label="Confirm Password"
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
    );
};

export default RegisterForm;
