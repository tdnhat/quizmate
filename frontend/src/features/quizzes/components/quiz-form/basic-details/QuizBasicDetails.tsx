import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { DescriptionField } from "./DescriptionField";
import CategoryField from "./CategoryField";
import ThumbnailField from "./ThumbnailField";
import TimeField from "./TimeField";
import DifficultyField from "./DifficultyField";
import { TagsField } from "./TagsField";
import { TitleField } from "./TitleField";
import { QuizFormValues } from "@/features/quizzes/schemas/quizFormSchema";
import { useQuizForm } from "../../../hooks/useQuizForm";
import { PassingScoreField } from "./PassingScoreField";
interface QuizBasicDetailsProps {
    form: UseFormReturn<QuizFormValues>;
    isLoading?: boolean;
    layout?: "default" | "compact";
}

export const QuizBasicDetails = ({
    form,
    isLoading: propIsLoading = false,
    layout = "default",
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

    if (layout === "compact") {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-4 md:col-span-2">
                        <TitleField
                            control={form.control}
                            isLoading={isLoading}
                        />
                        <DescriptionField control={form.control} />
                        <CategoryField
                            control={form.control}
                            isLoading={isLoading}
                        />
                        <div className="flex gap-4">
                            <PassingScoreField control={form.control} />
                            <TimeField
                                control={form.control}
                                isLoading={isLoading}
                            />
                        </div>
                        <TagsField
                            control={form.control}
                            isLoading={isLoading}
                            currentTag={currentTag}
                            setCurrentTag={setCurrentTag}
                            handleAddTag={handleAddTag}
                            handleRemoveTag={handleRemoveTag}
                        />
                        <DifficultyField
                            control={form.control}
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <ThumbnailField
                            control={form.control}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <TitleField control={form.control} isLoading={isLoading} />
            <DescriptionField control={form.control} />
            <div className="flex items-center gap-4 justify-start">
                <CategoryField control={form.control} isLoading={isLoading} />
                <TimeField control={form.control} isLoading={isLoading} />
                <PassingScoreField control={form.control} />
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
