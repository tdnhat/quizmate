import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Category } from "@/types/category";
import { TitleField } from "./TitleField";
import { DescriptionField } from "./DescriptionField";
import CategoryField from "./CategoryField";
import ThumbnailField from "./ThumbnailField";
import TimeField from "./TimeField";
import DifficultyField from "./DifficultyField";
import { TagsField } from "./TagsField";
import { CreateQuizFormValues } from "../../schemas/CreateQuizFormSchema";


interface FormFieldsProps {
    form: UseFormReturn<CreateQuizFormValues>;
    categories: Category[];
    isLoading: boolean;
}

export const FormFields = ({ form, categories, isLoading }: FormFieldsProps) => {
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