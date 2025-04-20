import { QuizCard } from "./QuizCard";
import { ScoreBadge } from "./ScoreBadge";
import { Trophy, Award } from "lucide-react";

interface QuizResults {
    topParticipants: {
        userId: string;
        username: string;
        score: number;
    }[];
    userRank?: number;
    userScore?: number;
    totalParticipants?: number;
}

interface ShowingResultsStateProps {
    quizTitle: string;
    score: number;
    quizResults?: QuizResults | null;
}

export const ShowingResultsState = ({
    quizTitle,
    score,
    quizResults,
}: ShowingResultsStateProps) => {
    return (
        <QuizCard
            title={quizTitle}
            headerChildren={<ScoreBadge score={score} />}
        >
            <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">Quiz Results</h2>
                
                {quizResults ? (
                    <div className="space-y-8">
                        {/* User's result */}
                        {quizResults.userRank && (
                            <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                                <p className="text-lg mb-2">Your Position</p>
                                <div className="flex items-center justify-center gap-2">
                                    <Trophy className="h-6 w-6 text-yellow-500" />
                                    <span className="text-3xl font-bold">{quizResults.userRank}</span>
                                    <span className="text-sm text-muted-foreground">of {quizResults.totalParticipants}</span>
                                </div>
                            </div>
                        )}
                        
                        {/* Top participants */}
                        {quizResults.topParticipants && quizResults.topParticipants.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="font-medium text-lg flex items-center justify-center gap-2">
                                    <Award className="h-5 w-5 text-amber-500" />
                                    Top Performers
                                </h3>
                                <div className="space-y-2">
                                    {quizResults.topParticipants.map((participant, index) => (
                                        <div key={participant.userId} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold">{index + 1}.</span>
                                                <span>{participant.username}</span>
                                            </div>
                                            <span className="font-semibold">{participant.score} pts</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p>Quiz completed! Final results are being calculated.</p>
                        <p className="text-sm text-muted-foreground">
                            Thanks for participating
                        </p>
                    </div>
                )}
            </div>
        </QuizCard>
    );
}; 