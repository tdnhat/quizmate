import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Info } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { api } from "@/api";
import { toast } from "react-hot-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/features/categories/hooks/useCategories";

export function AIQuizDialog() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [questionCount, setQuestionCount] = useState(5);
    const [difficulty, setDifficulty] = useState("Intermediate");
    const [categoryId, setCategoryId] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { categories } = useCategories();

    // Open dialog when user navigates to the quiz creation page
    useEffect(() => {
        if (location.pathname === "/quizzes/create") {
            setOpen(true);
        }
    }, [location.pathname]);

    const handleSubmit = async () => {
        if (!title || !categoryId) {
            toast.error("Please provide a title and category");
            return;
        }

        setIsGenerating(true);

        try {
            const response = await api.post("/quizzes/ai-generate", {
                title,
                difficulty,
                categoryId,
                numQuestions: questionCount,
                includeExplanations: true,
            });

            // Close dialog after successful generation
            setOpen(false);

            // Store the generated quiz in sessionStorage
            sessionStorage.setItem(
                "generatedQuiz",
                JSON.stringify(response.data)
            );

            // Redirect to the quiz form page to continue editing
            toast.success("Quiz generated successfully! You can now edit it.");

            // Refresh the page to load the generated quiz into the form
            navigate("/quizzes/create", {
                state: { generatedQuiz: response.data },
            });
        } catch (error) {
            console.error("Failed to generate quiz:", error);
            toast.error("Failed to generate quiz. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100">
                            <Sparkles className="h-4 w-4 text-cyan-500" />
                        </div>
                        <DialogTitle className="text-xl">
                            AI-Powered Quiz Generation
                        </DialogTitle>
                    </div>
                    <DialogDescription className="pt-2">
                        Let AI create a quiz for you! Enter a title and select
                        options below.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="font-medium">
                            Quiz Title
                        </Label>
                        <Input
                            id="title"
                            placeholder="E.g., Python Basics, World History..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-gray-300"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category" className="font-medium">
                            Category
                        </Label>
                        <Select
                            value={categoryId}
                            onValueChange={setCategoryId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories?.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="difficulty" className="font-medium">
                            Difficulty
                        </Label>
                        <Select
                            value={difficulty}
                            onValueChange={setDifficulty}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Beginner">
                                    Beginner
                                </SelectItem>
                                <SelectItem value="Intermediate">
                                    Intermediate
                                </SelectItem>
                                <SelectItem value="Advanced">
                                    Advanced
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <div className="flex justify-between">
                            <Label
                                htmlFor="questionCount"
                                className="font-medium"
                            >
                                Number of Questions
                            </Label>
                            <span className="text-sm text-gray-500">
                                {questionCount}
                            </span>
                        </div>
                        <Slider
                            id="questionCount"
                            min={3}
                            max={20}
                            step={1}
                            value={[questionCount]}
                            onValueChange={(value: number[]) =>
                                setQuestionCount(value[0])
                            }
                            className="py-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>3</span>
                            <span>20</span>
                        </div>
                    </div>

                    <div className="flex justify-center rounded-md bg-blue-50 p-3">
                        <Info className="h-5 w-5 mr-2 text-blue-700" />
                        <p className="text-sm text-blue-700">
                            The AI will generate a quiz based on your
                            selections. You can edit all content afterward.
                        </p>
                    </div>
                </div>

                <DialogFooter className="flex gap-2 sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="border-gray-300"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!title || !categoryId || isGenerating}
                        className="bg-cyan-600 hover:bg-cyan-700"
                    >
                        {isGenerating ? (
                            <>
                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Generating...
                            </>
                        ) : (
                            "Generate Quiz"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
