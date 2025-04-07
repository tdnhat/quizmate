import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Participant } from "../../types/session";
import { BarChart3 } from "lucide-react";
import { useState } from "react";
import { LeaderboardTable, StatsOverview, TopPerformers } from "./summarize";

interface SessionSummarizeProps {
    participants: Participant[];
    onEndSession: () => Promise<void>;
    isLoading: boolean;
}

const SessionSummarize = ({ participants, onEndSession, isLoading }: SessionSummarizeProps) => {
    const [open, setOpen] = useState(false);
    
    // Handle ending the session after viewing summary
    const handleEndSession = async () => {
        setOpen(false);
        await onEndSession();
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    className="bg-cyan-600 text-white cursor-pointer hover:shadow hover:bg-cyan-700 transition-colors"
                    disabled={isLoading}
                >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Summary & End Quiz
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Quiz Session Summary</DialogTitle>
                </DialogHeader>
                
                <div className="mt-6 space-y-6">
                    {/* Stats Overview */}
                    <StatsOverview participants={participants} />
                    
                    {/* Top Performers */}
                    <TopPerformers participants={participants} />
                    
                    {/* All Participants */}
                    <LeaderboardTable participants={participants} />
                </div>
                
                <div className="mt-6 flex justify-end">
                    <Button 
                        onClick={handleEndSession} 
                        disabled={isLoading}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        End Quiz Session
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SessionSummarize; 