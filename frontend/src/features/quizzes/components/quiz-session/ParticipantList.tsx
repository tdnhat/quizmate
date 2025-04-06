import { useState } from "react";
import { Search, RefreshCcw, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Participant } from "../../types/session";
import {
    getColorByInitialsFromName,
    getInitialsFromName,
    getTimeSince,
} from "@/lib/utils";
import { useDebounce } from "@/components/shared/hooks/useDebounce";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface ParticipantsListProps {
    participants: Participant[];
    onRefresh?: () => void;
    showScores?: boolean;
    hostId?: string;
}

const ParticipantsList = ({
    participants,
    onRefresh,
    showScores = false,
    hostId,
}: ParticipantsListProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms debounce

    // Filter participants based on search query and exclude host if hostId is provided
    const filteredParticipants = participants
        .filter((p) => !hostId || p.userId !== hostId) // Filter out host if hostId is provided
        .filter((p) =>
            p.username
                .toLowerCase()
                .includes(debouncedSearchQuery.toLowerCase())
        );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold">Participants</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    {filteredParticipants.length}
                </div>
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
                        {filteredParticipants.length > 0 ? (
                            filteredParticipants.map((participant) => (
                                <TableRow key={participant.userId}>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`flex h-8 w-8 items-center justify-center rounded-full ${getColorByInitialsFromName(
                                                    getInitialsFromName(
                                                        participant.username
                                                    )
                                                )}`}
                                            >
                                                {getInitialsFromName(
                                                    participant.username
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium line-clamp-1">
                                                    {participant.username}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    {showScores ? (
                                        <TableCell>
                                            <Badge className="bg-purple-100 text-purple-800">
                                                {participant.score || 0} pts
                                            </Badge>
                                        </TableCell>
                                    ) : (
                                        <>
                                            <TableCell>
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
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {getTimeSince(
                                                    participant.joinedAt
                                                )}
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={showScores ? 2 : 3}
                                    className="text-center text-muted-foreground"
                                >
                                    No participants
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
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
