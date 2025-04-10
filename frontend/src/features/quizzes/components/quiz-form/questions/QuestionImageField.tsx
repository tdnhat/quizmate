import { Control, useWatch } from "react-hook-form";
import { QuestionFormValues } from "@/features/quizzes/schemas/quizFormSchema";
import { useQuizForm } from "../../../hooks/useQuizForm";
import { useState, useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";

interface QuestionImageFieldProps {
    control: Control<QuestionFormValues>;
    questionIndex?: number;
}

const QuestionImageField = ({ control, questionIndex }: QuestionImageFieldProps) => {
    const { 
        isSubmitting,
        isUploadingQuestionImage, 
        uploadingQuestionIndex,
    } = useQuizForm();
    
    // Watch both imageFile and imageUrl
    const imageFile = useWatch({ control, name: "imageFile" });
    const imageUrl = useWatch({ control, name: "imageUrl" });
    
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputId = `question-image-${questionIndex}`;
    
    // Only show loading during actual upload (when form is being submitted)
    const isLoading = isSubmitting && 
                    isUploadingQuestionImage && 
                    uploadingQuestionIndex === questionIndex;
    
    // Set preview from either file or URL
    useEffect(() => {
        if (imageFile instanceof File) {
            const url = URL.createObjectURL(imageFile);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        } else if (imageUrl) {
            setPreview(imageUrl);
        } else {
            setPreview(null);
        }
    }, [imageFile, imageUrl]);
    
    const helperText = isLoading 
        ? "Uploading image..." 
        : imageFile instanceof File
            ? "Image ready to be uploaded when form is submitted"
            : "Upload an image for this question (optional)";
    
    // Handlers for image upload field
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>, 
        onChange: (value: File | undefined) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };
    
    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) {
            setIsDragging(true);
        }
    };

    const handleDrop = (
        e: React.DragEvent, 
        onChange: (value: File | undefined) => void
    ) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                onChange(file);
            }
        }
    };
    
    const handleRemoveImage = (onChange: (value: File | undefined) => void) => {
        onChange(undefined);
        // Also need to clear imageUrl if it exists
        const imageUrlControl = control._fields.imageUrl;
        if (imageUrlControl) {
            // @ts-expect-error - accessing private field which is necessary to reset the imageUrl
            const imageUrlOnChange = imageUrlControl._f.onChange;
            imageUrlOnChange(undefined);
        }
    };
    
    return (
        <FormField
            control={control}
            name="imageFile"
            render={({ field: { onChange } }) => (
                <FormItem>
                    <FormLabel>Question Image</FormLabel>
                    {helperText && <FormDescription>{helperText}</FormDescription>}
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center w-full h-64 border-2 border-dashed rounded-lg">
                                <div className="animate-pulse flex items-center justify-center">
                                    <div className="h-16 w-16 bg-muted rounded-full"></div>
                                </div>
                            </div>
                        ) : preview ? (
                            <div className="relative w-full border rounded-lg overflow-hidden bg-muted/20">
                                <div className="aspect-video w-full max-w-md mx-auto overflow-hidden flex items-center justify-center">
                                    <img
                                        src={preview}
                                        alt="Image preview"
                                        className="object-contain max-h-full max-w-full"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-md cursor-pointer"
                                    onClick={() => handleRemoveImage(onChange)}
                                    disabled={isLoading}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <label
                                htmlFor={inputId}
                                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
                                ${
                                    isDragging
                                        ? "border-primary bg-primary/5"
                                        : "border-muted-foreground/30 hover:bg-muted/10 hover:border-muted-foreground/50"
                                } transition-all duration-200`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, onChange)}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                    <div className="text-sm text-center text-muted-foreground">
                                        Upload image
                                    </div>
                                </div>
                            </label>
                        )}
                        <FormControl>
                            <input
                                id={inputId}
                                type="file"
                                disabled={isLoading}
                                accept="image/png,image/jpeg,image/gif"
                                className="hidden"
                                onChange={(e) => handleImageChange(e, onChange)}
                            />
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default QuestionImageField; 