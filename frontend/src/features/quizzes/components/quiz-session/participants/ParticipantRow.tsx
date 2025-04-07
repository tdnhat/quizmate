import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Participant } from "../../../types/session";
import { getTimeSince } from "@/lib/utils";
import ParticipantAvatar from "./ParticipantAvatar";
import ScoreBadge from "./ScoreBadge";
import StatusBadge from "./StatusBadge";

interface ParticipantRowProps {
    participant: Participant;
    showScores: boolean;
    hasScoreChanged: boolean;
}

const ParticipantRow = ({ participant, showScores, hasScoreChanged }: ParticipantRowProps) => (
    <motion.tr
        key={participant.userId}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        className="border-b"
    >
        <TableCell>
            <div className="flex items-center gap-4">
                <ParticipantAvatar username={participant.username} />
                <div>
                    <p className="font-medium line-clamp-1">
                        {participant.username}
                    </p>
                </div>
            </div>
        </TableCell>
        {showScores ? (
            <TableCell>
                <ScoreBadge 
                    score={participant.score} 
                    hasChanged={hasScoreChanged} 
                />
            </TableCell>
        ) : (
            <>
                <TableCell>
                    <StatusBadge isActive={participant.isActive || false} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                    {getTimeSince(participant.joinedAt)}
                </TableCell>
            </>
        )}
    </motion.tr>
);

export default ParticipantRow; 