import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

export function AIQuizDialog() {
    const [open, setOpen] = useState(false);
    const [topic, setTopic] = useState("");
    const [questionCount, setQuestionCount] = useState(5);
    const [isGenerating, setIsGenerating] = useState(false);
    const location = useLocation();

    // Open dialog when user navigates to the quiz creation page
    useEffect(() => {
        if (location.pathname === "/quizzes/create") {
            setOpen(true);
        }
    }, [location.pathname]);

    const handleSubmit = async () => {
        if (!topic) return;

        setIsGenerating(true);

        try {
            // Here you would implement the actual API call to generate the quiz

            // Simulate API call with timeout
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Close dialog after successful generation
            setOpen(false);

            // You would then handle the response data to populate the quiz form
        } catch (error) {
            console.error("Failed to generate quiz:", error);
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
                        Let AI create a quiz for you! Enter a topic and we'll
                        generate questions automatically.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="topic" className="font-medium">
                            Quiz Topic
                        </Label>
                        <Input
                            id="topic"
                            placeholder="E.g., World History, Mathematics, Science..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="border-gray-300"
                        />
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
                            The AI will generate multiple-choice questions based
                            on your topic. You can edit them afterward.
                        </p>
                    </div>
                </div>

                <DialogFooter className="flex gap-2 sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="border-gray-300"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!topic || isGenerating}
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
