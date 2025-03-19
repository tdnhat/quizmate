import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Category } from "@/types/category";
import { DescriptionField } from "./DescriptionField";
import CategoryField from "./CategoryField";
import ThumbnailField from "./ThumbnailField";
import TimeField from "./TimeField";
import DifficultyField from "./DifficultyField";
import { TagsField } from "./TagsField";
import { TitleField } from "./TitleField";
import { QuizFormValues } from "@/features/quizzes/schemas/quizFormSchema";
import { useQuizForm } from "../../../hooks/useQuizForm";
interface QuizBasicDetailsProps {
    form: UseFormReturn<QuizFormValues>;
    categories: Category[];
    isLoading?: boolean;
}

export const QuizBasicDetails = ({
    form,
    categories,
    isLoading: propIsLoading = false,
}: QuizBasicDetailsProps) => {
    const [currentTag, setCurrentTag] = useState("");
    const { isLoading: contextIsLoading } = useQuizForm();
    const isLoading = propIsLoading || contextIsLoading;


    const handleAddTag = (tag: string) => {
        const currentTags = form.getValues("tags");
        if (
            tag.trim() &&
            currentTags.length < 5 &&
            !currentTags.includes(tag.trim())
        ) {
            form.setValue("tags", [...currentTags, tag.trim()]);
        }
        setCurrentTag("");
    };

    const handleRemoveTag = (tag: string) => {
        const currentTags = form.getValues("tags");
        form.setValue(
            "tags",
            currentTags.filter((t) => t !== tag)
        );
    };

    return (
        <>
            <TitleField control={form.control} isLoading={isLoading} />
            <DescriptionField control={form.control} />
            <div className="flex items-center gap-4 justify-start">
                <CategoryField
                    control={form.control}
                    categories={categories}
                    isLoading={isLoading}
                />
                <TimeField control={form.control} isLoading={isLoading} />
            </div>
            <ThumbnailField control={form.control} isLoading={isLoading} />
            <DifficultyField control={form.control} isLoading={isLoading} />
            <TagsField
                control={form.control}
                isLoading={isLoading}
                currentTag={currentTag}
                setCurrentTag={setCurrentTag}
                handleAddTag={handleAddTag}
                handleRemoveTag={handleRemoveTag}
            />
        </>
    );
};
