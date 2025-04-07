"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    Trophy,
    ChevronRight,
    Clock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Participant {
    id: string;
    name: string;
    score: number;
    avatar?: string;
    previousRank?: number;
    currentRank?: number;
}

interface QuestionTransitionProps {
    currentQuestion: number;
    totalQuestions: number;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
    isCorrect: boolean;
    participants: Participant[];
    onNextQuestion: () => void;
    autoTransitionDelay?: number;
}

export default function QuestionTransition({
    currentQuestion,
    totalQuestions,
    userAnswer,
    correctAnswer,
    explanation,
    isCorrect,
    participants,
    onNextQuestion,
    autoTransitionDelay = 10000, // 10 seconds total (5 for answer, 5 for leaderboard)
}: QuestionTransitionProps) {
    const [currentView, setCurrentView] = useState<"answer" | "leaderboard">(
        "answer"
    );
    const [timeRemaining, setTimeRemaining] = useState(
        autoTransitionDelay / 1000
    );
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Calculate ranks for participants
    const rankedParticipants = [...participants]
        .sort((a, b) => b.score - a.score)
        .map((participant, index) => ({
            ...participant,
            currentRank: index + 1,
        }));

    // Auto transition timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);

                    // If on answer view, switch to leaderboard
                    if (currentView === "answer") {
                        setCurrentView("leaderboard");
                        setTimeRemaining(5); // 5 seconds for leaderboard
                        return 5;
                    }
                    // If on leaderboard, move to next question
                    else {
                        setIsTransitioning(true);
                        setTimeout(() => {
                            onNextQuestion();
                        }, 500); // Short delay for exit animation
                        return 0;
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentView, onNextQuestion]);

    // Progress percentage for timer
    const progressPercentage =
        (timeRemaining / (currentView === "answer" ? 5 : 5)) * 100;

    return (
        <div className="w-full max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
                {/* Answer Status View */}
                {currentView === "answer" && !isTransitioning && (
                    <motion.div
                        key="answer-status"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        {/* Header */}
                        <div
                            className={`p-6 ${isCorrect ? "bg-emerald-50" : "bg-rose-50"}`}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-sm font-medium text-gray-500">
                                    Question {currentQuestion} of{" "}
                                    {totalQuestions}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    <span>Next in {timeRemaining}s</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {isCorrect ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 10,
                                        }}
                                    >
                                        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 10,
                                        }}
                                    >
                                        <XCircle className="h-10 w-10 text-rose-500" />
                                    </motion.div>
                                )}
                                <h2 className="text-xl font-bold">
                                    {isCorrect ? "Correct!" : "Incorrect"}
                                </h2>
                            </div>
                        </div>

                        {/* Answer Details */}
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                                        Your Answer:
                                    </h3>
                                    <p
                                        className={`font-medium ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}
                                    >
                                        {userAnswer}
                                    </p>
                                </div>

                                {!isCorrect && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                                            Correct Answer:
                                        </h3>
                                        <p className="font-medium text-emerald-600">
                                            {correctAnswer}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                                        Explanation:
                                    </h3>
                                    <p className="text-gray-700">
                                        {explanation}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Progress
                                    value={progressPercentage}
                                    className="h-1.5"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Leaderboard View */}
                {currentView === "leaderboard" && !isTransitioning && (
                    <motion.div
                        key="leaderboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5" />
                                    <h2 className="text-xl font-bold">
                                        Leaderboard
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        Next question in {timeRemaining}s
                                    </span>
                                </div>
                            </div>
                            <p className="text-cyan-100 text-sm">
                                Current standings after question{" "}
                                {currentQuestion}
                            </p>
                        </div>

                        {/* Leaderboard List */}
                        <div className="divide-y divide-gray-100">
                            <AnimatePresence>
                                {rankedParticipants.map(
                                    (participant, index) => (
                                        <motion.div
                                            key={participant.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.1,
                                            }}
                                            className={`flex items-center p-4 ${index === 0 ? "bg-amber-50" : index === 1 ? "bg-gray-50" : index === 2 ? "bg-amber-50/50" : ""}`}
                                        >
                                            {/* Rank */}
                                            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                                                {participant.currentRank}
                                            </div>

                                            {/* Participant Info */}
                                            <div className="ml-4 flex-grow">
                                                <div className="font-medium">
                                                    {participant.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Score: {participant.score}
                                                </div>
                                            </div>

                                            {/* Rank Change Indicator */}
                                            {participant.previousRank &&
                                                participant.previousRank !==
                                                    participant.currentRank && (
                                                    <div
                                                        className={`text-sm font-medium ${
                                                            participant.previousRank >
                                                            participant.currentRank
                                                                ? "text-emerald-600"
                                                                : "text-rose-600"
                                                        }`}
                                                    >
                                                        {participant.previousRank >
                                                        participant.currentRank ? (
                                                            <motion.div
                                                                initial={{
                                                                    y: 10,
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    y: 0,
                                                                    opacity: 1,
                                                                }}
                                                                className="flex items-center"
                                                            >
                                                                <ChevronRight className="h-4 w-4 rotate-90" />
                                                                <span>
                                                                    +
                                                                    {participant.previousRank -
                                                                        participant.currentRank}
                                                                </span>
                                                            </motion.div>
                                                        ) : (
                                                            <motion.div
                                                                initial={{
                                                                    y: -10,
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    y: 0,
                                                                    opacity: 1,
                                                                }}
                                                                className="flex items-center"
                                                            >
                                                                <ChevronRight className="h-4 w-4 -rotate-90" />
                                                                <span>
                                                                    -
                                                                    {participant.currentRank -
                                                                        participant.previousRank}
                                                                </span>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                )}
                                        </motion.div>
                                    )
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="p-4 border-t">
                            <Progress
                                value={progressPercentage}
                                className="h-1.5"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
