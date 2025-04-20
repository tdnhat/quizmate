import { User, AlertTriangle } from "lucide-react";
import { SessionInfo as SessionInfoType } from "../../api/sessionApi";

interface SessionInfoProps {
    sessionInfo: SessionInfoType;
}

export const SessionInfo = ({ sessionInfo }: SessionInfoProps) => {
    return (
        <div className="space-y-6">
            {/* Host info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                <User className="h-4 w-4" />
                <span>Hosted by {sessionInfo.hostName}</span>
            </div>

            {/* Ready check box */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                        <p className="font-medium text-amber-800">
                            Ready to start?
                        </p>
                        <p className="text-sm text-amber-700">
                            Once you join, you will participate
                            in real-time with other users. Good
                            luck!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}; 