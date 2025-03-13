import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const QuizCTAButton = () => {
    return (
        <Button
            className="w-full text-lg py-6 bg-cyan-500 text-white cursor-pointer hover:bg-cyan-700 transition-colors"
            size="lg"
        >
            Take Quiz
            <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
    );
};

export default QuizCTAButton;
