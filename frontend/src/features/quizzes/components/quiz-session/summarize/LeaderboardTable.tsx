import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Participant } from "../../../types/session";
import { ScoreBadge } from "../participants";

interface LeaderboardTableProps {
    participants: Participant[];
}

const LeaderboardTable = ({ participants }: LeaderboardTableProps) => {
    // Sort participants by score in descending order
    const sortedParticipants = [...participants]
        .filter(p => p.isActive)
        .sort((a, b) => (b.score || 0) - (a.score || 0));

    return (
        <div>
            <h3 className="text-lg font-medium mb-3">All Participants</h3>
            <div className="border rounded-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedParticipants.length > 0 ? (
                            sortedParticipants.map((participant, index) => (
                                <TableRow key={participant.userId}>
                                    <TableCell className="font-medium">#{index + 1}</TableCell>
                                    <TableCell>{participant.username}</TableCell>
                                    <TableCell>
                                        <ScoreBadge score={participant.score || 0} hasChanged={false} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                                    No participants
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default LeaderboardTable; 