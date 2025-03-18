import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload } from "lucide-react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface ImageUploadFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    control: Control<TFieldValues>;
    name: TName;
    label: string;
    isLoading?: boolean;
}

const ImageUploadField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    label,
    isLoading = false,
}: ImageUploadFieldProps<TFieldValues, TName>) => {
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropzoneRef = useRef<HTMLLabelElement>(null);
    const inputId = `${name}-upload`;

    // Create preview URL when image changes
    useEffect(() => {
        if (!image) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(image);
        setPreviewUrl(url);

        // Cleanup function to revoke the object URL when component unmounts
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [image]);

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void
    ) => {
        const file = event.target.files?.[0];
        onChange(file ?? undefined); // ✅ Ensure undefined is passed when no file
        setImage(file || null);
    };

    const handleRemoveImage = (onChange: (...event: any[]) => void) => {
        setImage(null);
        // Important: Pass undefined instead of null to make it optional in Zod validation
        onChange(undefined);
        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
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
        onChange: (...event: any[]) => void
    ) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                setImage(file);
                onChange(file);
            }
        }
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { value, onChange, ...restField } }) => (
                <FormItem className="space-y-4">
                    <FormLabel>{label}</FormLabel>
                    <div className="space-y-4">
                        {previewUrl ? (
                            <div className="relative w-full border rounded-lg overflow-hidden bg-muted/20">
                                <div className="aspect-video w-full max-w-md mx-auto overflow-hidden flex items-center justify-center">
                                    <img
                                        src={previewUrl}
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
                                ref={dropzoneRef}
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
                                    <p className="mb-2 text-sm font-semibold">
                                        <span className="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG or GIF (Optional)
                                    </p>
                                </div>
                            </label>
                        )}
                        <FormControl>
                            <Input
                                id={inputId}
                                type="file"
                                ref={fileInputRef}
                                disabled={isLoading}
                                accept="image/png,image/jpeg,image/gif"
                                className="hidden"
                                value=""
                                onChange={(e) => handleImageChange(e, onChange)}
                                {...restField}
                            />
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ImageUploadField;
