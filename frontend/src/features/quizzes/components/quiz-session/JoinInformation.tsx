import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useSessionDetails } from "../../hooks/session";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface JoinInformationProps {
    sessionId: string;
}

/**
 * Component to display session join information including QR code and join code
 */
const JoinInformation = ({ sessionId }: JoinInformationProps) => {
    const { joinCode, isLoading, error } = useSessionDetails({ sessionId });
    const [codeCopied, setCodeCopied] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    // URL for joining the quiz
    const joinUrl = joinCode
        ? `${window.location.origin}/join/${joinCode}`
        : "";

    const handleCopyCode = () => {
        if (!joinCode) return;
        navigator.clipboard.writeText(joinCode);
        toast.success("Join code copied to clipboard");
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2000);
    };

    const handleCopyLink = () => {
        if (!joinUrl) return;
        navigator.clipboard.writeText(joinUrl);
        toast.success("Join link copied to clipboard");
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    };

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    // Early fallback for QR code rendering
    const renderQrCode = () => {
        try {
            return (
                <QRCodeSVG
                    value={joinUrl || " "} // Provide a space as fallback
                    size={200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                />
            );
        } catch (err) {
            console.error("Error rendering QR code:", err);
            return (
                <div className="w-[200px] h-[200px] bg-gray-100 flex items-center justify-center">
                    <p className="text-sm text-gray-500">QR Code unavailable</p>
                </div>
            );
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-cyan-600">Join this Quiz</CardTitle>
                <CardDescription>
                    Share this information with participants
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                {/* QR Code Row */}
                <div className="flex justify-center">
                    {isLoading ? (
                        <Skeleton className="h-[200px] w-[200px]" />
                    ) : (
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            {renderQrCode()}
                        </div>
                    )}
                </div>

                {/* Join Code and URL Row */}
                <div className="grid grid-cols-1 gap-4">
                    {/* Join Code Section */}
                    <div className="flex flex-col rounded-lg">
                        <span className="text-sm font-medium mb-2">
                            Join Code:
                        </span>
                        {isLoading ? (
                            <Skeleton className="h-10 w-full" />
                        ) : (
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="flex-1 w-full">
                                    <div className="bg-slate-50 border border-slate-200 border-r-0 h-10 flex items-center px-3 rounded-md rounded-r-none font-mono text-xl tracking-widest justify-center">
                                        {joinCode || "-"}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="default"
                                    onClick={handleCopyCode}
                                    disabled={!joinCode}
                                    className="shrink-0 h-10 w-24 rounded-l-none border-slate-200"
                                >
                                    {codeCopied ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                    {codeCopied ? "Copied!" : "Copy"}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Join URL Section */}
                    <div className="flex flex-col rounded-lg">
                        <span className="text-sm font-medium mb-2">
                            Join URL:
                        </span>
                        {isLoading ? (
                            <Skeleton className="h-10 w-full" />
                        ) : (
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="flex-1 w-full">
                                    <div className="bg-slate-50 border border-slate-200 border-r-0 h-10 flex items-center px-3 rounded-md rounded-r-none text-sm truncate">
                                        {joinUrl || "-"}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="default"
                                    onClick={handleCopyLink}
                                    disabled={!joinUrl}
                                    className="shrink-0 h-10 w-24 rounded-l-none border-slate-200"
                                >
                                    {linkCopied ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                    {linkCopied ? "Copied!" : "Copy"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default JoinInformation;
