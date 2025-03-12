import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateQuizFormValues } from "../../../../../components/shared/schemas/CreateQuizFormSchema";

interface TagsFieldProps {
    control: Control<CreateQuizFormValues>;
    isLoading: boolean;
    currentTag: string;
    setCurrentTag: (tag: string) => void;
    handleAddTag: (tag: string) => void;
    handleRemoveTag: (tag: string) => void;
}

export const TagsField = ({
    control,
    isLoading,
    currentTag,
    setCurrentTag,
    handleAddTag,
    handleRemoveTag,
}: TagsFieldProps) => {
    return (
        <FormField
            control={control}
            name="tags"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Tags (max 5)</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {field.value.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="px-2 py-1 text-xs"
                            >
                                {tag}
                                <button
                                    type="button"
                                    className="ml-1 text-gray-500 hover:text-gray-700"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    <X size={12} />
                                </button>
                            </Badge>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <FormControl>
                            <Input
                                placeholder="Enter a tag and press Add"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && currentTag) {
                                        e.preventDefault();
                                        handleAddTag(currentTag);
                                    }
                                }}
                                disabled={isLoading || field.value.length >= 5}
                            />
                        </FormControl>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddTag(currentTag)}
                            disabled={
                                !currentTag ||
                                field.value.length >= 5 ||
                                isLoading
                            }
                        >
                            <Plus size={16} />
                        </Button>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
