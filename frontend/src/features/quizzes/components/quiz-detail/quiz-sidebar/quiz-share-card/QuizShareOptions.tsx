import { Button } from "@/components/ui/button";
import { Twitter, Facebook } from "lucide-react";

const QuizShareOptions = () => {
    return (
        <>
            <Button variant="outline" size="icon" className="h-9 w-9 cursor-pointer">
                <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 cursor-pointer">
                <Facebook className="h-4 w-4" />
            </Button>
        </>
    );
};

export default QuizShareOptions;
