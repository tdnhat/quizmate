import { useState, useEffect } from "react";
import { BetweenQuestionsState } from "./BetweenQuestionsState";
import ParticipantList from "../quiz-session/ParticipantList";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ParticipantJoinedEvent } from "@/services/signalr/hubs/quizSessionHub";
import { Clock } from "lucide-react";

interface Question {
    text: string;
    imageUrl?: string;
    options: { id: string; text: string }[];
    timeLimit?: number;
}

interface Feedback {
    isCorrect?: boolean;
    timedOut?: boolean;
    points?: number;
    basePoints?: number;
    timeBonus?: number;
    timeTaken?: number;
}

interface ParticipantQuestionTransitionProps {
    quizTitle: string;
    score: number;
    currentQuestion?: Question | null;
    selectedOption?: string | null;
    feedback?: Feedback | null;
    participants: ParticipantJoinedEvent[];
}

export const ParticipantQuestionTransition = ({
    quizTitle,
    score,
    currentQuestion,
    selectedOption,
    feedback,
    participants,
}: ParticipantQuestionTransitionProps) => {
    const [timeRemaining, setTimeRemaining] = useState(5); // Fixed 5 seconds for BetweenQuestionsState
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    // Timer effect
    useEffect(() => {
        if (timeRemaining <= 0) {
            setShowLeaderboard(true);
            return;
        }

        const interval = setInterval(() => {
            setTimeRemaining((prev) => prev - 0.1);
        }, 100);

        return () => clearInterval(interval);
    }, [timeRemaining]);

    return (
        <AnimatePresence mode="wait">
            {!showLeaderboard ? (
                // Show BetweenQuestionsState for the first 5 seconds
                <motion.div
                    key="between-state"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <BetweenQuestionsState
                        quizTitle={quizTitle}
                        score={score}
                        currentQuestion={currentQuestion}
                        selectedOption={selectedOption}
                        feedback={feedback}
                    />
                </motion.div>
            ) : (
                // Show Leaderboard until the host's new question is displayed
                <motion.div
                    key="leaderboard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="w-full max-w-6xl mx-auto py-0">
                        <div className="p-6 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-4 md:px-20 lg:px-40 rounded-t-md">
                            <div className="flex flex-col gap-2 justify-between items-center">
                                <h2 className="text-xl font-bold">
                                    Current Standings
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <p className="text-sm">
                                        Waiting for host to display new question...
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4">
                            <ParticipantList
                                participants={participants}
                                showScores={true}
                                isSearchable={false}
                            />
                        </div>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
