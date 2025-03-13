import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuizShareOptions from "./QuizShareOptions";

const QuizShareCard = () => {
    return (
        <Card>
            <CardContent>
                <h3 className="font-medium mb-2">Share this quiz</h3>
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                        Copy Link
                    </Button>
                    <QuizShareOptions />
                </div>
            </CardContent>
        </Card>
    );
};

export default QuizShareCard;
