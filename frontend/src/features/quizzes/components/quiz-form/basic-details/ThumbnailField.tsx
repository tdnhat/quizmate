import { Control } from "react-hook-form";
import { QuizFormValues } from "@/features/quizzes/schemas/quizFormSchema";
import ImageUploadField from "@/components/shared/components/ImageUploadField";

interface ThumbnailFieldProps {
    control: Control<QuizFormValues>;
    isLoading: boolean;
}

const ThumbnailField = ({ control, isLoading }: ThumbnailFieldProps) => {
    return (
        <ImageUploadField 
            control={control}
            name="thumbnail"
            label="Thumbnail"
            isLoading={isLoading}
        />
    );
};

export default ThumbnailField;