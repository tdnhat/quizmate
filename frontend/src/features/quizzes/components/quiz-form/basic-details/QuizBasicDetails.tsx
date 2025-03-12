import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Category } from "@/types/category";
import { DescriptionField } from "./DescriptionField";
import CategoryField from "./CategoryField";
import ThumbnailField from "./ThumbnailField";
import TimeField from "./TimeField";
import DifficultyField from "./DifficultyField";
import { TagsField } from "./TagsField";
import { CreateQuizFormValues } from "../../../../../components/shared/schemas/CreateQuizFormSchema";
import { TitleField } from "./TitleField";


interface QuizBasicDetailsProps {
    form: UseFormReturn<CreateQuizFormValues>;
    categories: Category[];
    isLoading: boolean;
}

export const QuizBasicDetails = ({ form, categories, isLoading }: QuizBasicDetailsProps) => {
    const [currentTag, setCurrentTag] = useState("");

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
            <CategoryField control={form.control} categories={categories} isLoading={isLoading} />
            <ThumbnailField control={form.control} isLoading={isLoading} />
            <TimeField control={form.control} isLoading={isLoading} />
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