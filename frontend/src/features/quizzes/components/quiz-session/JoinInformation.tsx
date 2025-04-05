import React, { useState } from "react";
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
                <CardTitle>Join this Quiz</CardTitle>
                <CardDescription>
                    Share this information with participants
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6">
                {isLoading ? (
                    <Skeleton className="h-[200px] w-[200px] shrink-0" />
                ) : (
                    <div className="bg-white p-4 rounded-md shadow-sm shrink-0">
                        {renderQrCode()}
                    </div>
                )}

                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col h-[100px] justify-between p-4">
                        <span className="text-sm font-medium">Join Code:</span>
                        {isLoading ? (
                            <Skeleton className="h-10 w-full" />
                        ) : (
                            <div className="flex flex-col sm:flex-row items-center gap-2 mt-1">
                                <div className="flex-1 w-full">
                                    <div className="bg-muted h-10 flex items-center px-3 rounded-md font-mono text-xl tracking-widest justify-center">
                                        {joinCode || "-"}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="default"
                                    onClick={handleCopyCode}
                                    disabled={!joinCode}
                                    className="shrink-0 h-10 w-24"
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

                    <div className="flex flex-col h-[100px] justify-between p-4">
                        <span className="text-sm font-medium">Join URL:</span>
                        {isLoading ? (
                            <Skeleton className="h-10 w-full" />
                        ) : (
                            <div className="flex flex-col sm:flex-row items-center gap-2 mt-1">
                                <div className="flex-1 w-full">
                                    <div className="bg-muted h-10 flex items-center px-3 rounded-md text-sm truncate">
                                        {joinUrl || "-"}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="default"
                                    onClick={handleCopyLink}
                                    disabled={!joinUrl}
                                    className="shrink-0 h-10 w-24 "
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
