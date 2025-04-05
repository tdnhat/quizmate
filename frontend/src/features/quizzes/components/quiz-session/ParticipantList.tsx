import { useState } from "react";
import { Search, RefreshCcw, UserCog, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Participant } from "../../types/session";


interface ParticipantsListProps {
    participants: Participant[];
    onRefresh?: () => void;
}

const ParticipantsList = ({
    participants,
    onRefresh,
}: ParticipantsListProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    console.log(participants);

    // Filter participants based on search query
    const filteredParticipants = participants.filter((p) =>
        p.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get initials from username
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part.charAt(0))
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    // Get time since joined with better fallback handling
    const getTimeSince = (joinedAt?: Date | string) => {
        if (!joinedAt) return "Recently";
        
        try {
            const joinTime = typeof joinedAt === 'string' 
                ? new Date(joinedAt).getTime() 
                : joinedAt.getTime();
            const now = new Date().getTime();
            const diffInMinutes = Math.floor((now - joinTime) / (1000 * 60));
            
            if (diffInMinutes < 1) return "Just now";
            if (diffInMinutes === 1) return "1 minute ago";
            return `${diffInMinutes} minutes ago`;
        } catch (_) {
            return "Recently";
        }
    };

    // Get random color by initials (for demo)
    const getColorByInitials = (initials: string) => {
        const colors = [
            "bg-blue-100 text-blue-700",
            "bg-purple-100 text-purple-700",
            "bg-green-100 text-green-700",
            "bg-orange-100 text-orange-700",
            "bg-pink-100 text-pink-700",
        ];
        const charCode = initials.charCodeAt(0);
        return colors[charCode % colors.length];
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Participants</h3>
                <Badge className="bg-blue-100 text-blue-800">
                    {participants.length} Joined
                </Badge>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search participants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            <div className="border rounded-md">
                <div className="grid grid-cols-4 p-3 text-sm font-medium text-muted-foreground border-b">
                    <div className="col-span-1">NAME</div>
                    <div className="col-span-1">STATUS</div>
                    <div className="col-span-1">JOINED</div>
                    <div className="col-span-1 text-right">ACTIONS</div>
                </div>

                <div className="divide-y">
                    {filteredParticipants.length > 0 ? (
                        filteredParticipants.map((participant) => (
                            <div
                                key={participant.userId}
                                className="grid grid-cols-4 p-3 items-center"
                            >
                                <div className="col-span-1 flex items-center gap-4">
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full ${getColorByInitials(getInitials(participant.username))}`}
                                    >
                                        {getInitials(participant.username)}
                                    </div>
                                    <div>
                                        <p className="font-medium line-clamp-1">
                                            {participant.username}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <Badge
                                        className={
                                            participant.isActive
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                        }
                                    >
                                        {participant.isActive
                                            ? "Connected"
                                            : "Disconnected"}
                                    </Badge>
                                </div>
                                <div className="col-span-1 text-sm text-muted-foreground">
                                    {getTimeSince(participant.joinedAt)}
                                </div>
                                <div className="col-span-1 flex justify-end space-x-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <UserCog className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-muted-foreground">
                            No participants match your search
                        </div>
                    )}
                </div>
            </div>

            {onRefresh && (
                <div className="flex justify-center mt-4">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={onRefresh}
                    >
                        <RefreshCcw className="h-4 w-4" /> Refresh List
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ParticipantsList;
