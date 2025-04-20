import { Award } from "lucide-react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Participant } from "../../../types/session";
import { getPositionColor } from "@/features/quizzes/utils";

const WinnerCard = ({
    participant,
    position,
}: {
    participant: Participant;
    position: number;
}) => {
    const color = getPositionColor(position);

    return (
        <motion.div
            className="bg-white p-5 rounded-lg border shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${color}`}
                    >
                        {position + 1}
                    </div>
                    <div>
                        <div className="font-medium text-lg">
                            {participant.username}
                        </div>
                        <div className="mt-1 flex items-center">
                            <Award className="h-4 w-4 mr-1 text-amber-500" />
                            <span className="font-bold">
                                {participant.score || 0} pts
                            </span>
                        </div>
                    </div>
                </div>
                {position === 0 && (
                    <Trophy className="h-7 w-7 text-amber-500" />
                )}
            </div>
        </motion.div>
    );
};

export default WinnerCard;
