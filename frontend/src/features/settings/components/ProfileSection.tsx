import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { AuthContext } from "@/features/auth/contexts/AuthContext";
import { useSettingsContext } from "../contexts/SettingsContext";
import {
    profileUpdateSchema,
    ProfileUpdateValues,
} from "../schemas/settingsSchema";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Trash2 } from "lucide-react";
import { AxiosError } from "axios";
import { LoadingButton } from "@/features/auth/components/shared/LoadingButton";

interface BackendValidationError {
    [key: string]: string[];
}

interface ProfileSectionProps {
    labelPosition?: "top" | "left";
}

export const ProfileSection = ({ labelPosition = "top" }: ProfileSectionProps) => {
    const { user } = useContext(AuthContext);
    const {
        updateProfile,
        isUpdatingProfile,
        uploadAvatar,
        isUploadingAvatar,
        deleteAvatar,
        isDeletingAvatar,
    } = useSettingsContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [hasChanges, setHasChanges] = useState(false);

    const form = useForm<ProfileUpdateValues>({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            displayName: user?.displayName || "",
            userName: user?.userName || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
        },
        mode: "onChange",
    });

    // Watch form values to detect changes
    const watchedValues = form.watch();
    
    // Check if any field has changed from the original values
    useEffect(() => {
        // Only compare fields that are not empty or different from original values
        const hasDisplayNameChanged = 
            watchedValues.displayName !== "" && 
            watchedValues.displayName !== user?.displayName;
            
        const hasUserNameChanged = 
            watchedValues.userName !== "" && 
            watchedValues.userName !== user?.userName;
            
        const hasEmailChanged = 
            watchedValues.email !== "" && 
            watchedValues.email !== user?.email;
            
        const hasPhoneNumberChanged = 
            watchedValues.phoneNumber !== user?.phoneNumber;
            
        setHasChanges(
            hasDisplayNameChanged || 
            hasUserNameChanged || 
            hasEmailChanged || 
            hasPhoneNumberChanged
        );
    }, [watchedValues, user]);

    // Update form defaults when user data changes
    useEffect(() => {
        if (user) {
            form.reset({
                displayName: user.displayName || "",
                userName: user.userName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
            });
        }
    }, [user, form]);

    const onSubmit = async (data: ProfileUpdateValues) => {
        try {
            // Only submit fields that have changed and aren't empty
            const changedValues: Record<string, string> = {};

            if (data.displayName && data.displayName !== user?.displayName) {
                changedValues.displayName = data.displayName;
            }

            if (data.userName && data.userName !== user?.userName) {
                changedValues.userName = data.userName;
            }

            if (data.email && data.email !== user?.email) {
                changedValues.email = data.email;
            }

            // Phone number can be empty string to clear it
            if (data.phoneNumber !== user?.phoneNumber) {
                changedValues.phoneNumber = data.phoneNumber || "";
            }

            if (Object.keys(changedValues).length > 0) {
                await updateProfile(changedValues);
                setHasChanges(false);
            }
        } catch (error) {
            console.error("Profile update failed:", error);
            
            // Handle backend validation errors
            if (error instanceof AxiosError && error.response?.status === 400) {
                const validationErrors = error.response
                    .data as BackendValidationError;

                // Set field errors from the backend
                Object.entries(validationErrors).forEach(
                    ([field, messages]) => {
                        const fieldName =
                            field.charAt(0).toLowerCase() + field.slice(1);

                        if (field === "UserName" || fieldName === "userName") {
                            form.setError("userName", {
                                type: "manual",
                                message: messages[0], // Usually "Username is already taken"
                            });
                        } else if (field === "Email" || fieldName === "email") {
                            form.setError("email", {
                                type: "manual",
                                message: messages[0], // Usually "Email is already registered"
                            });
                        } else if (
                            field === "DisplayName" ||
                            fieldName === "displayName"
                        ) {
                            form.setError("displayName", {
                                type: "manual",
                                message: messages[0],
                            });
                        } else if (
                            field === "PhoneNumber" ||
                            fieldName === "phoneNumber"
                        ) {
                            form.setError("phoneNumber", {
                                type: "manual",
                                message: messages[0],
                            });
                        } else {
                            // For any other field errors that don't map directly to form fields
                            form.setError("root", {
                                type: "manual",
                                message: Array.isArray(messages)
                                    ? messages[0]
                                    : messages as string,
                            });
                        }
                    }
                );
            }
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            await uploadAvatar(file);
            event.target.value = "";
        }
    };

    const handleDeleteAvatar = async () => {
        await deleteAvatar();
    };

    const isLoading =
        isUpdatingProfile || isUploadingAvatar || isDeletingAvatar;

    // Render avatar upload section
    const renderAvatarSection = () => (
        <div className="flex flex-col items-center mb-6 sm:flex-row sm:items-start sm:space-x-4">
            <div className="relative mb-4 sm:mb-0">
                <Avatar
                    className="h-24 w-24 cursor-pointer"
                    onClick={handleAvatarClick}
                >
                    <AvatarImage
                        src={user?.avatarUrl}
                        alt={user?.displayName || "Avatar"}
                    />
                    <AvatarFallback>
                        {user?.displayName?.substring(0, 2) || "U"}
                    </AvatarFallback>
                </Avatar>
                <div
                    className="absolute bottom-0 right-0 bg-cyan-600 rounded-full p-1.5 cursor-pointer"
                    onClick={handleAvatarClick}
                >
                    <Camera className="h-4 w-4 text-white" />
                </div>
                {!user?.avatarUrl?.includes("ui-avatars.com") && (
                    <button
                        type="button"
                        className="absolute -bottom-1 -left-1 bg-destructive text-white rounded-full p-1.5 cursor-pointer hover:bg-destructive/90"
                        onClick={handleDeleteAvatar}
                        disabled={isDeletingAvatar}
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                    disabled={isUploadingAvatar}
                />
            </div>
            <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600 mb-1">Profile Picture</p>
                <p className="text-xs text-gray-500">
                    Click to upload or change your profile picture
                </p>
            </div>
        </div>
    );

    if (labelPosition === "left") {
        // Two-column layout with labels on the left
        return (
            <div className="w-full">
                {form.formState.errors.root && (
                    <div className="p-3 mb-4 rounded-md bg-destructive/15 text-destructive text-sm">
                        {form.formState.errors.root.message}
                    </div>
                )}
                
                {renderAvatarSection()}
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                        <FormLabel className="text-right md:mb-0">Display Name</FormLabel>
                                        <div className="md:col-span-2">
                                            <FormControl>
                                                <Input
                                                    placeholder="Your display name"
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                        <FormLabel className="text-right md:mb-0">Username</FormLabel>
                                        <div className="md:col-span-2">
                                            <FormControl>
                                                <Input
                                                    placeholder="Your username"
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                        <FormLabel className="text-right md:mb-0">Email Address</FormLabel>
                                        <div className="md:col-span-2">
                                            <FormControl>
                                                <Input
                                                    placeholder="Your email address"
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                        <FormLabel className="text-right md:mb-0">Phone Number</FormLabel>
                                        <div className="md:col-span-2">
                                            <FormControl>
                                                <Input
                                                    placeholder="Your phone number (optional)"
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end mt-6">
                            <LoadingButton
                                type="submit"
                                disabled={isLoading || !hasChanges}
                                isLoading={isUpdatingProfile}
                                loadingText="Saving..."
                                className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white transition-colors duration-300"
                            >
                                Save Profile
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </div>
        );
    }

    // Default: labels on top (original layout)
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-cyan-600">Profile Information</CardTitle>
                <CardDescription>
                    Update your personal information and how others see you on
                    the platform
                </CardDescription>
            </CardHeader>
            <CardContent>
                {renderAvatarSection()}

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {form.formState.errors.root && (
                            <div className="p-3 mb-4 rounded-md bg-destructive/15 text-destructive text-sm">
                                {form.formState.errors.root.message}
                            </div>
                        )}
                        
                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your display name"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your username"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your email address"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your phone number (optional)"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end mt-6">
                            <LoadingButton
                                type="submit"
                                disabled={isLoading || !hasChanges}
                                isLoading={isUpdatingProfile}
                                loadingText="Saving..."
                                className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white transition-colors duration-300"
                            >
                                Save Profile
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
