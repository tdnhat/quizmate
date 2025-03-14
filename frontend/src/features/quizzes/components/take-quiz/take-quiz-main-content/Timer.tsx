import { useEffect } from "react";
import { useState } from "react";
import { useTakeQuiz } from "../../../hooks/useTakeQuiz";
import { Clock } from "lucide-react";

const Timer = () => {
    const { timeRemaining, updateTimeRemaining, submitQuiz } = useTakeQuiz();
    const [isWarning, setIsWarning] = useState(false);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    // Update timer every second
    useEffect(() => {
        const timer = setInterval(() => {
            updateTimeRemaining(timeRemaining - 1);

            if (timeRemaining <= 60 && !isWarning) {
                setIsWarning(true);
            }

            if (timeRemaining <= 0) {
                clearInterval(timer);
                submitQuiz();
            }
        }, 1000);

        // Cleanup timer on unmount
        return () => clearInterval(timer);
    }, [timeRemaining, isWarning, updateTimeRemaining, submitQuiz]);

    return (
        <div
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 ${isWarning ? "text-red-600 bg-orange-50" : "text-gray-700"}`}
        >
            <Clock className="h-5 w-5" />
            <span className={`font-medium ${isWarning ? "animate-pulse" : ""}`}>
                {formatTime(timeRemaining)}
            </span>
        </div>
    );
};

export default Timer;
