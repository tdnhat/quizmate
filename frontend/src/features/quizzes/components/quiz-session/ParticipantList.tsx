import { useState, useRef, useEffect } from "react";
import { Participant } from "../../types/session";
import {
    filterParticipants,
    sortParticipants,
} from "@/lib/utils";
import { useDebounce } from "@/components/shared/hooks/useDebounce";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AnimatePresence } from "framer-motion";
import {
    EmptyRow,
    ListHeader,
    ParticipantRow,
    RefreshButton,
    SearchInput
} from "./participants";

// Types
interface ParticipantsListProps {
    participants: Participant[];
    onRefresh?: () => void;
    showScores?: boolean;
    hostId?: string;
}

// Main component
const ParticipantsList = ({
    participants,
    onRefresh,
    showScores = false,
    hostId,
}: ParticipantsListProps) => {
    // State and refs
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const prevParticipantsRef = useRef<Participant[]>([]);

    // Filter and sort logic
    const filteredParticipants = filterParticipants(participants, debouncedSearchQuery, hostId);
    const sortedParticipants = sortParticipants(filteredParticipants, showScores);

    // Track score changes for animation
    useEffect(() => {
        prevParticipantsRef.current = participants;
    }, [participants]);

    // Helper to check if score has changed
    const hasScoreChanged = (participant: Participant): boolean => {
        if (!showScores) return false;
        const prevParticipant = prevParticipantsRef.current.find(p => p.userId === participant.userId);
        return !!(prevParticipant && prevParticipant.score !== participant.score);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <ListHeader participantCount={filteredParticipants.length} />
            
            {/* Search */}
            <SearchInput 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            
            {/* Table */}
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>NAME</TableHead>
                            {showScores ? (
                                <TableHead>SCORE</TableHead>
                            ) : (
                                <>
                                    <TableHead>STATUS</TableHead>
                                    <TableHead>JOINED</TableHead>
                                </>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {sortedParticipants.length > 0 ? (
                                sortedParticipants.map((participant) => {
                                    // Force boolean type for showScores
                                    const isShowingScores = showScores === true;
                                    
                                    return (
                                        <ParticipantRow 
                                            key={participant.userId}
                                            participant={participant}
                                            showScores={isShowingScores}
                                            hasScoreChanged={hasScoreChanged(participant)}
                                        />
                                    );
                                })
                            ) : (
                                <EmptyRow colSpan={showScores ? 2 : 3} />
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            {/* Refresh button */}
            {onRefresh && !showScores && (
                <RefreshButton onClick={onRefresh} />
            )}
        </div>
    );
};

export default ParticipantsList;
