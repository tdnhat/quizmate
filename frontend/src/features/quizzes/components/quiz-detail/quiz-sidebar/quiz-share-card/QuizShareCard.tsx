import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "lucide-react";
import QuizShareOptions from "./QuizShareOptions";
import { toast } from "react-hot-toast";
const QuizShareCard = () => {
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard.");
    };
    return (
        <Card>
            <CardContent>
                <h3 className="font-medium mb-2">Share this quiz</h3>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="flex items-center cursor-pointer"
                        onClick={handleCopyLink}
                    >
                        <Link className="w-4 h-4 mr-2" />
                        Copy Link
                    </Button>
                    <QuizShareOptions />
                </div>
            </CardContent>
        </Card>
    );
};

export default QuizShareCard;
