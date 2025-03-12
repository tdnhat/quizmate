import { UseFormReturn } from "react-hook-form";
import { QuestionFormValues } from "../../../schemas/quizFormSchema";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";

interface AnswerItemProps {
    form: UseFormReturn<QuestionFormValues>;
    index: number;
    disabled?: boolean;
    canDelete?: boolean;
    onDelete: () => void;
}

export const AnswerItem = ({ form, index, disabled = false, canDelete = true, onDelete }: AnswerItemProps) => {
    return (
        <div className="flex items-start gap-3 bg-white p-3 rounded-md border">
            <FormField
                control={form.control}
                name={`answers.${index}.isCorrect`}
                render={({ field }) => (
                    <FormItem className="flex items-center space-x-0 space-y-0 mt-2">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            
            <div className="flex-1">
                <FormField
                    control={form.control}
                    name={`answers.${index}.text`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    placeholder="Enter answer text" 
                                    {...field} 
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name={`answers.${index}.explanation`}
                    render={({ field }) => (
                        <FormItem className="mt-2">
                            <FormControl>
                                <Input 
                                    placeholder="Explanation (optional)" 
                                    {...field} 
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            
            {canDelete && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700 mt-1"
                >
                    <Trash2 size={16} />
                </Button>
            )}
        </div>
    );
};