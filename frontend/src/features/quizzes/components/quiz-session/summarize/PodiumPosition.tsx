import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Participant } from "../../../types/session";
import {
    getGradientColor,
    getPositionColor,
    getPositionLabel,
} from "@/features/quizzes/utils";

const PodiumPosition = ({
    participant,
    position,
    height,
    isBest = false,
}: {
    participant: Participant;
    position: number;
    height: string;
    isBest?: boolean;
}) => {
    const color = getPositionColor(position);
    const label = getPositionLabel(position);

    return (
        <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: position * 0.2,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
            }}
        >
            <div className="mb-3 flex flex-col items-center">
                <div className="text-center mb-1">
                    <p className="font-semibold text-sm truncate max-w-28">
                        {participant.username}
                    </p>
                    <p className="font-bold text-lg">
                        {participant.score || 0} pts
                    </p>
                </div>
                {isBest && <Trophy className="h-6 w-6 text-amber-500 mb-2" />}
            </div>

            <div
                className={`relative ${height} w-24 rounded-t-lg flex items-center justify-center font-bold text-white bg-gradient-to-b ${getGradientColor(position)}`}
            >
                <div
                    className={`absolute -top-4 ${isBest ? "w-8 h-8" : "w-7 h-7"} rounded-full flex items-center justify-center text-white font-bold ${color}`}
                >
                    {position + 1}
                </div>
                <span className="text-sm font-medium">{label}</span>
            </div>
        </motion.div>
    );
};

export default PodiumPosition;
