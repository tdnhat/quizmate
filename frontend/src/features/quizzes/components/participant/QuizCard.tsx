import { ReactNode } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface QuizCardProps {
    title: string;
    headerChildren?: ReactNode;
    children: ReactNode;
    footerChildren?: ReactNode;
}

export const QuizCard = ({
    title,
    headerChildren,
    children,
    footerChildren,
}: QuizCardProps) => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{title}</CardTitle>
                    {headerChildren}
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {footerChildren && (
                <CardFooter>
                    {footerChildren}
                </CardFooter>
            )}
        </Card>
    );
}; 