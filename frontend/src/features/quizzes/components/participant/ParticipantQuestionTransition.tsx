import { useState, useEffect } from "react";
import { BetweenQuestionsState } from "./BetweenQuestionsState";
import ParticipantList from "../quiz-session/ParticipantList";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Participant } from "../../types/session";

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
    participants: Participant[];
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

    console.log(participants);

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
                    <Card className="w-full max-w-4xl mx-auto p-0">
                        <div className="p-6 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-t-md">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">
                                    Current Standings
                                </h2>
                            </div>
                        </div>

                        <div className="p-4">
                            <ParticipantList
                                participants={participants}
                                showScores={true}
                            />
                        </div>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
