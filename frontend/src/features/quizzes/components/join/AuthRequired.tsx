import { LogIn } from "lucide-react";

interface AuthRequiredProps {
    joinCode?: string;
}

export const AuthRequired = ({ joinCode }: AuthRequiredProps) => {
    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center gap-3">
                <LogIn className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-semibold">
                    Authentication Required
                </h2>
            </div>
            <p className="text-center">
                You need to sign in to join this quiz session.
            </p>
            {joinCode && (
                <div className="bg-muted p-4 rounded-md text-center">
                    <p className="text-sm">
                        You'll be redirected back to this page
                        after signing in.
                    </p>
                </div>
            )}
        </div>
    );
}; 