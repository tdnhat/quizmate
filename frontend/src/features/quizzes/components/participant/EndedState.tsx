import { CheckCircle, Award } from "lucide-react";
import { ParticipantList } from "../quiz-session";
import { ParticipantJoinedEvent } from "@/services/signalr/hubs/quizSessionHub";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EndedStateProps {
    quizTitle: string;
    participants: ParticipantJoinedEvent[];
    score?: number;
    hostId?: string;
}

export const EndedState = ({
    quizTitle,
    participants,
    score = 0,
    hostId,
}: EndedStateProps) => {
    // Sort participants by score in descending order
    const sortedParticipants = [...participants].sort(
        (a, b) => (b.score || 0) - (a.score || 0)
    );

    // Calculate basic statistics (similar to ResultsStatistics)
    const totalParticipants = participants.length;
    const rankPosition =
        sortedParticipants.findIndex((p) => p.score === score) + 1;

    return (
        <div className="space-y-6">
            {/* Quiz completion header */}
            <div className="bg-gradient-to-r from-cyan-700 to-cyan-500 rounded-lg text-white px-4 md:px-20 lg:px-40 py-6 shadow-lg">
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                        <CheckCircle className="h-12 w-12 text-cyan-600" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-1">
                            Quiz Completed!
                        </h2>
                        <p className="font-semibold mb-2">{quizTitle}</p>
                        <p className="text-white text-opacity-90">
                            Thank you for participating
                        </p>
                    </div>

                    {/* Score display similar to ResultsSummary */}
                    {score > 0 && (
                        <div className="mt-2 flex flex-col items-center">
                            <span className="text-4xl font-bold">
                                {score}
                                <span className="text-xl opacity-80"> pts</span>
                            </span>
                            {rankPosition > 0 && totalParticipants > 0 && (
                                <span className="text-sm text-white text-opacity-80 mt-1">
                                    Your position: {rankPosition} /{" "}
                                    {totalParticipants}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Content based on selected tab */}
            <div className="bg-white rounded-lg border shadow-sm p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-cyan-700">
                    <Award className="h-5 w-5" />
                    Final Standings
                </h3>
                <ParticipantList
                    participants={sortedParticipants}
                    showScores={true}
                    isSearchable={false}
                    hostId={hostId}
                />
            </div>

            {/* Button row similar to ResultsSummary */}
            <div className="flex justify-center gap-4 pt-4">
                <Link to="/quizzes">
                    <Button
                        variant="outline"
                        className="w-40 text-md py-6 cursor-pointer border border-gray-200 hover:shadow transition-colors"
                    >
                        Explore Quizzes
                    </Button>
                </Link>
                <Link to="/home">
                    <Button
                        className="w-40 text-md py-6 bg-cyan-600 text-white cursor-pointer hover:shadow hover:bg-cyan-700 transition-colors"
                    >
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
};
