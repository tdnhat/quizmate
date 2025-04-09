import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import { RegisterFormValues } from "@/features/auth/schemas/registerFormSchema";

interface TermsFieldProps {
    form: UseFormReturn<RegisterFormValues>;
    isLoading: boolean;
}

export const TermsField = ({ form, isLoading }: TermsFieldProps) => {
    return (
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
    );
}; 