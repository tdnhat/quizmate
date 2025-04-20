import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Participant } from "../../types/session";
import { BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { LeaderboardTable, StatsOverview, TopPerformers } from "./summarize";

interface SessionSummarizeProps {
    participants: Participant[];
    onEndSession: () => Promise<void>;
    isLoading: boolean;
}

const SessionSummarize = ({
    participants,
    onEndSession,
    isLoading,
}: SessionSummarizeProps) => {
    const [open, setOpen] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);

    // Update window height on resize and initial load
    useEffect(() => {
        const updateWindowHeight = () => {
            setWindowHeight(window.innerHeight);
        };
        
        // Set initial height
        updateWindowHeight();
        
        // Add resize listener
        window.addEventListener('resize', updateWindowHeight);
        
        // Clean up
        return () => window.removeEventListener('resize', updateWindowHeight);
    }, []);

    // Handle ending the session after viewing summary
    const handleEndSession = async () => {
        setOpen(false);
        await onEndSession();
    };
    
    // Calculate max height for dialog content
    const maxDialogHeight = windowHeight ? `${windowHeight * 0.85}px` : '85vh';
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    className="w-full md:w-auto bg-cyan-600 text-white cursor-pointer hover:shadow hover:bg-cyan-700 transition-colors"
                    disabled={isLoading}
                >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    <span className="whitespace-nowrap">View Summary & End Quiz</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 max-w-3xl mx-auto overflow-y-auto" style={{ maxHeight: maxDialogHeight }}>
                <div className="flex flex-col h-full max-h-full">
                    <DialogHeader className="flex-shrink-0 pb-4">
                        <DialogTitle className="text-xl md:text-2xl text-cyan-600">Quiz Session Summary</DialogTitle>
                        <DialogDescription className="text-sm opacity-75">
                            Review performance before ending the session
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex-grow overflow-y-auto pr-1 pb-4 space-y-6">
                        {/* Stats Overview */}
                        <StatsOverview participants={participants} />
                        
                        {/* Top Performers */}
                        <TopPerformers participants={participants} />
                        
                        {/* All Participants */}
                        <LeaderboardTable participants={participants} />
                    </div>
                    
                    <div className="flex-shrink-0 pt-4 mt-auto border-t flex justify-end">
                        <Button 
                            onClick={handleEndSession} 
                            disabled={isLoading}
                            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                        >
                            End Quiz Session
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SessionSummarize;