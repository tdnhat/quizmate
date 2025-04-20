import { Button } from "@/components/ui/button";
import LoadingIndicator from "@/components/shared/components/LoadingIndicator";
import { useQuizForm } from "../../hooks/useQuizForm";
import { ChevronDownIcon, ChevronLeftIcon, Tag } from "lucide-react";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Quiz } from "@/types/quiz";

interface ReviewStepProps {
    onSubmit: (isDraft: boolean) => Promise<Quiz | undefined>;
    isLoading: boolean;
}

export const ReviewStep = ({
    onSubmit,
    isLoading,
}: ReviewStepProps) => {
    const { categories } = useCategories();
    const { formValues, questions, goToPreviousStep } = useQuizForm();
    const [submissionType, setSubmissionType] = useState<
        "draft" | "publish" | null
    >(null);

    const categoryName = categories.find(
        (category) => category.id === formValues.categoryId
    )?.name;

    useEffect(() => {
        if (!isLoading) {
            setSubmissionType(null);
        }
    }, [isLoading]);

    const handleSubmit = async (isDraft: boolean) => {
        setSubmissionType(isDraft ? "draft" : "publish");
        await onSubmit(isDraft);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium mb-4">Review Your Quiz</h2>

                <div className="space-y-6 bg-gray-50 p-4 rounded-md">
                    <div>
                        <h3 className="text-md font-medium mb-2">
                            Basic Details
                        </h3>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Title
                                </dt>
                                <dd className="mt-1 text-sm">
                                    {formValues.title}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Category
                                </dt>
                                <dd className="mt-1 text-sm">{categoryName}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Duration
                                </dt>
                                <dd className="mt-1 text-sm">
                                    {formValues.timeMinutes} minutes
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Difficulty Level
                                </dt>
                                <dd className="mt-1 text-sm">
                                    {formValues.difficulty}
                                </dd>
                            </div>
                            {formValues.description && (
                                <div className="col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Description
                                    </dt>
                                    <dd className="mt-1 text-sm">
                                        {formValues.description}
                                    </dd>
                                </div>
                            )}
                            {formValues.tags && formValues.tags.length > 0 && (
                                <div className="col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Tags
                                    </dt>
                                    <dd className="mt-1 flex flex-wrap gap-1">
                                        {formValues.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="px-2 py-1 text-xs text-gray-700 bg-white border border-gray-300"
                                            >
                                                <Tag className="h-3 w-3 mr-1" />{" "}
                                                {tag}
                                            </Badge>
                                        ))}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    <div>
                        <h3 className="text-md font-medium mb-2">
                            Questions ({questions.length})
                        </h3>
                        <ul className="space-y-3">
                            {questions.map((question, index) => (
                                <li
                                    key={index}
                                    className="bg-white p-3 rounded border"
                                >
                                    <p className="font-medium">
                                        {index + 1}. {question.text}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {question.questionType ===
                                        "SingleChoice"
                                            ? "Single Choice"
                                            : "True/False"}{" "}
                                        • {question.points}{" "}
                                        {question.points === 1
                                            ? "point"
                                            : "points"}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button
                    type="button"
                    onClick={goToPreviousStep}
                    variant="outline"
                    className="flex items-center cursor-pointer"
                    disabled={isLoading}
                >
                    <ChevronLeftIcon className="mr-2 h-4 w-4" />
                    Back
                </Button>

                {/* Desktop view: separate buttons */}
                <div className="hidden sm:flex gap-2">
                    <Button
                        type="button"
                        onClick={() => handleSubmit(true)}
                        variant="outline"
                        className="cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading && submissionType === "draft" ? (
                            <>
                                <LoadingIndicator />
                                <span>Saving Draft...</span>
                            </>
                        ) : (
                            "Save Draft"
                        )}
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleSubmit(false)}
                        disabled={isLoading}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white transition-colors cursor-pointer"
                    >
                        {isLoading && submissionType === "publish" ? (
                            <>
                                <LoadingIndicator /> <span>Saving...</span>
                            </>
                        ) : (
                            "Create Quiz"
                        )}
                    </Button>
                </div>

                {/* Mobile view: dropdown menu */}
                <div className="sm:hidden">
                    {isLoading ? (
                        <Button 
                            disabled 
                            className="bg-cyan-600 hover:bg-cyan-700 text-white transition-colors cursor-pointer"
                        >
                            <LoadingIndicator />
                            <span className="ml-2">
                                {submissionType === "draft" ? "Saving Draft..." : "Creating..."}
                            </span>
                        </Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center bg-cyan-600 hover:bg-cyan-700 h-9 px-3 py-2 rounded-md text-white">
                                    Save <ChevronDownIcon className="h-4 w-4 ml-2" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleSubmit(true)}>
                                    Save as Draft
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSubmit(false)}>
                                    Publish Quiz
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </div>
    );
};
