import { ReactNode } from "react";

interface JoinQuizLayoutProps {
    children: ReactNode;
}

export const JoinQuizLayout = ({ children }: JoinQuizLayoutProps) => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4 bg-cyan-50">
            {children}
        </div>
    );
}; 