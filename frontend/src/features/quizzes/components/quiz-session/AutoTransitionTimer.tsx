import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { SmoothProgress } from "@/components/ui/smooth-progress";

interface AutoTransitionTimerProps {
    defaultDuration?: number; // Duration in seconds
    onTimeEnd: () => void;
    isLastQuestion?: boolean;
}

const AutoTransitionTimer = ({
    defaultDuration = 5, // Default 5 seconds
    onTimeEnd,
    isLastQuestion = false,
}: AutoTransitionTimerProps) => {
    const [timeRemaining, setTimeRemaining] = useState(defaultDuration);
    const [isActive, setIsActive] = useState(true);

    // Skip timer for the last question
    useEffect(() => {
        if (isLastQuestion) {
            setIsActive(false);
        }
    }, [isLastQuestion]);
    
    // Countdown effect with smaller intervals for smoother animation
    useEffect(() => {
        if (!isActive || timeRemaining <= 0) return;
        
        // Update every 100ms for smoother animation
        const animationInterval = 100; // milliseconds
        const decrementAmount = 1 / (1000 / animationInterval); // Fraction of a second to decrement
        
        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= decrementAmount) {
                    clearInterval(interval);
                    setIsActive(false);
                    onTimeEnd();
                    return 0;
                }
                return prev - decrementAmount;
            });
        }, animationInterval);
        
        return () => clearInterval(interval);
    }, [isActive, timeRemaining, onTimeEnd]);
    
    // Don't render when inactive or for last question
    if (!isActive || isLastQuestion) return null;
    
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <Clock className={cn(
                        "h-4 w-4",
                        timeRemaining <= 3 
                            ? "text-red-600 animate-pulse" 
                            : timeRemaining <= 5 
                                ? "text-yellow-600" 
                                : "text-cyan-600"
                    )} />
                    <span className={cn(
                        "text-sm",
                        timeRemaining <= 3 
                            ? "text-red-600 font-bold" 
                            : timeRemaining <= 5 
                                ? "text-yellow-600 font-semibold" 
                                : "text-cyan-600"
                    )}>
                        Auto-advancing in {Math.ceil(timeRemaining)}s
                    </span>
                </div>
                <button 
                    onClick={() => setIsActive(false)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
            </div>
            
            <SmoothProgress 
                value={timeRemaining} 
                max={defaultDuration} 
                colorMode="timer"
                height="6px"
                transitionSpeed={100}
            />
        </div>
    );
};

export default AutoTransitionTimer; 