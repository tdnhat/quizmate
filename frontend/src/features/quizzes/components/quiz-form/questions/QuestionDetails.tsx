import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { QuestionFormValues } from "../../../schemas/quizFormSchema";
import QuestionImageField from "./QuestionImageField";

interface QuestionDetailsProps {
    form: UseFormReturn<QuestionFormValues>;
    questionIndex?: number;
}

export const QuestionDetails = ({ form, questionIndex }: QuestionDetailsProps) => {
    return (
        <div className="space-y-4 border rounded-md p-4 bg-gray-50">
            <h3 className="font-medium">Question Details</h3>

            <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Question Text</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Enter your question here..."
                                className="min-h-[100px] bg-white"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="questionType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question Type</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="bg-white w-48">
                                        <SelectValue placeholder="Select question type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="SingleChoice">
                                        Single Choice
                                    </SelectItem>
                                    <SelectItem value="TrueFalse">
                                        True/False
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="points"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Points</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-24 bg-white"
                                    min={1}
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseInt(e.target.value) || 1
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <QuestionImageField 
                control={form.control}
                questionIndex={questionIndex}
            />

            <FormField
                control={form.control}
                name="explanation"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Explanation (Optional)</FormLabel>
                        <FormControl>
                            <Textarea
                                className="bg-white"
                                placeholder="Explain the correct answer..."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};
