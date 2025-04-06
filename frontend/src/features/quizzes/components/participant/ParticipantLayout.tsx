import { ReactNode } from "react";

interface ParticipantLayoutProps {
    children: ReactNode;
}

export const ParticipantLayout = ({ children }: ParticipantLayoutProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            {children}
        </div>
    );
};
