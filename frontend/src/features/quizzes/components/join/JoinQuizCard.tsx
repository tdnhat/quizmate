import { ReactNode } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { SessionInfo as SessionInfoType } from "../../api/sessionApi";

interface JoinQuizCardProps {
    title: string;
    sessionInfo?: SessionInfoType | null;
    children: ReactNode;
    buttonText: string;
    onButtonClick: () => void;
}

export const JoinQuizCard = ({
    title,
    sessionInfo,
    children,
    buttonText,
    onButtonClick,
}: JoinQuizCardProps) => {
    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
                <div className="mx-auto bg-cyan-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-2">
                    <BrainCircuit className="h-8 w-8 text-cyan-700" />
                </div>
                <CardTitle className="text-2xl font-bold text-cyan-600">
                    {title}
                </CardTitle>
                {sessionInfo && (
                    <div className="mt-2">
                        <h2 className="text-xl font-semibold">
                            {sessionInfo.quizTitle}
                        </h2>
                    </div>
                )}
            </CardHeader>

            <CardContent className="space-y-6">
                {children}
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full bg-cyan-600 text-white hover:bg-cyan-700 cursor-pointer transition-colors"
                    size="lg"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    );
};
