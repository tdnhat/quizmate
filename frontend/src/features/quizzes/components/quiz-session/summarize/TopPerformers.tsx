import { Medal } from "lucide-react";
import { Participant } from "../../../types/session";
import WinnerCard from "./WinnerCard";
import PodiumPosition from "./PodiumPosition";

interface TopPerformersProps {
    participants: Participant[];
}

const TopPerformers = ({ participants }: TopPerformersProps) => {
    // Sort participants by score and get top 3
    const topParticipants = [...participants]
        .filter((p) => p.isActive)
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 3);

    if (topParticipants.length === 0) {
        return null;
    }

    // Determine if we have enough participants for a podium (at least 2)
    const showPodium = topParticipants.length >= 2;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium flex items-center">
                <Medal className="mr-2 h-5 w-5 text-amber-500" />
                Top Performers
            </h3>

            {showPodium ? (
                <div className="relative h-64 flex items-end justify-center">
                    {/* Podium display for top 3 */}
                    <div className="flex items-end space-x-4">
                        {/* Second place */}
                        {topParticipants.length > 1 && (
                            <PodiumPosition
                                participant={topParticipants[1]}
                                position={1}
                                height="h-36"
                            />
                        )}

                        {/* First place */}
                        <PodiumPosition
                            participant={topParticipants[0]}
                            position={0}
                            height="h-48"
                            isBest={true}
                        />

                        {/* Third place */}
                        {topParticipants.length > 2 && (
                            <PodiumPosition
                                participant={topParticipants[2]}
                                position={2}
                                height="h-28"
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {topParticipants.map((participant, index) => (
                        <WinnerCard
                            key={participant.userId}
                            participant={participant}
                            position={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopPerformers;
