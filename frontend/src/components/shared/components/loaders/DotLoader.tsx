import type React from "react";

interface EnhancedLoaderProps {
    size?: "xs" | "sm" | "md" | "lg";
    color?: string;
    variant?: "bounce" | "pulse-bounce" | "wave-bounce" | "fade-bounce";
    speed?: "slow" | "normal" | "fast";
    gap?: "tight" | "normal" | "wide";
    dotCount?: 3 | 4 | 5;
    className?: string;
}

const EnhancedLoader: React.FC<EnhancedLoaderProps> = ({
    size = "sm",
    color = "bg-cyan-600",
    variant = "bounce",
    speed = "normal",
    gap = "normal",
    dotCount = 3,
    className = "",
}) => {
    // Size classes for the dots
    const sizeClasses = {
        xs: "w-1.5 h-1.5",
        sm: "w-2.5 h-2.5",
        md: "w-3.5 h-3.5",
        lg: "w-4 h-4",
    };

    // Gap between dots
    const gapClasses = {
        tight: "gap-1",
        normal: "gap-1.5",
        wide: "gap-2.5",
    };

    // Animation speed modifiers
    const speedClasses = {
        slow: "[animation-duration:1.8s]",
        normal: "", // Default animation duration
        fast: "[animation-duration:0.7s]",
    };

    // Get animation class based on variant
    const getAnimationClass = (variant: string) => {
        switch (variant) {
            case "pulse-bounce":
                return "animate-bounce hover:animate-pulse";
            case "wave-bounce":
                return "animate-bounce hover:animate-dot-wave";
            case "fade-bounce":
                return "animate-bounce hover:animate-dot-fade";
            default:
                return "animate-bounce";
        }
    };

    // Generate dots with proper animation delays
    const renderDots = () => {
        const dots = [];
        const baseDelay =
            speed === "slow" ? 0.4 : speed === "fast" ? 0.15 : 0.2;

        for (let i = 0; i < dotCount; i++) {
            // Calculate delay - similar to your original pattern but dynamic
            const delay =
                i === dotCount - 1 ? 0 : (dotCount - i - 1) * baseDelay;

            dots.push(
                <div
                    key={i}
                    className={`${sizeClasses[size]} rounded-full ${color} ${getAnimationClass(variant)}`}
                    style={{ animationDelay: `-${delay}s` }}
                />
            );
        }

        return dots;
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div
                className={`flex flex-row ${gapClasses[gap]} ${speedClasses[speed]}`}
            >
                {renderDots()}
            </div>
        </div>
    );
};

// Export the original loader for backward compatibility
export const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center mt-6">
            <div className="flex flex-row gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-bounce [animation-delay:-0.1s]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-bounce"></div>
            </div>
        </div>
    );
};

export default EnhancedLoader;
