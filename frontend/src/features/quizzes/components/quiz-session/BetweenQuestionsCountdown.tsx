import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BetweenQuestionsCountdownProps {
    seconds?: number;
    onComplete: () => void;
    className?: string;
}

const BetweenQuestionsCountdown = ({
    seconds = 5,
    onComplete,
    className,
}: BetweenQuestionsCountdownProps) => {
    const [timeRemaining, setTimeRemaining] = useState(seconds);
    const [scale, setScale] = useState(1);

    // Reset scale when number changes for animation
    useEffect(() => {
        if (Number.isInteger(timeRemaining)) {
            setScale(1.4); // Start large

            // Quickly return to normal size
            const timeout = setTimeout(() => {
                setScale(1);
            }, 200);

            return () => clearTimeout(timeout);
        }
    }, [Math.floor(timeRemaining)]);

    // Countdown timer
    useEffect(() => {
        if (timeRemaining <= 0) {
            onComplete();
            return;
        }

        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0.1) {
                    clearInterval(interval);
                    onComplete();
                    return 0;
                }
                return prev - 0.1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    const displayNumber = Math.ceil(timeRemaining);

    // Get color based on time remaining
    const getColor = () => {
        if (displayNumber <= 1) return "text-red-500";
        if (displayNumber <= 2) return "text-orange-500";
        if (displayNumber <= 3) return "text-yellow-500";
        return "text-cyan-600";
    };

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-8 gap-6",
                className
            )}
        >
            <div className="text-center">
                <p className="text-gray-600 font-medium mb-8">
                    Next question in
                </p>

                <div
                    className="flex flex-col items-center justify-center"
                    style={{
                        transition: "transform 200ms ease-out",
                    }}
                >
                    <span
                        className={cn("text-8xl font-bold", getColor())}
                        style={{
                            transform: `scale(${scale})`,
                            transition: "transform 200ms ease-out",
                        }}
                    >
                        {displayNumber}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BetweenQuestionsCountdown;
