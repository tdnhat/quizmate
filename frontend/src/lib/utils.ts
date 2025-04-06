import { DifficultyLevel } from "@/types/quiz";
import { User } from "@/types/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Get difficulty color
export const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
        case "Beginner":
            return "bg-green-100 text-green-800 hover:bg-green-100";
        case "Intermediate":
            return "bg-blue-100 text-blue-800 hover:bg-blue-100";
        case "Advanced":
            return "bg-red-100 text-red-800 hover:bg-red-100";
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
};

// Format time as MM:SS
export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const getUserInitials = (user: User) => {
    if (user.displayName) {
        return user.displayName
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }
    return user.userName.charAt(0).toUpperCase();
};

// Get initials from username
export const getInitialsFromName = (name: string) => {
    return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
};

// Get random color by initials
export const getColorByInitialsFromName = (initials: string) => {
    const colors = [
        "bg-blue-100 text-blue-700",
        "bg-purple-100 text-purple-700",
        "bg-green-100 text-green-700",
        "bg-orange-100 text-orange-700",
        "bg-pink-100 text-pink-700",
    ];
    const charCode = initials.charCodeAt(0);
    return colors[charCode % colors.length];
};

// Get time since joined with better fallback handling
export const getTimeSince = (joinedAt?: Date | string) => {
    if (!joinedAt) return "Recently";

    try {
        const joinTime =
            typeof joinedAt === "string"
                ? new Date(joinedAt).getTime()
                : joinedAt.getTime();
        const now = new Date().getTime();
        const diffInMinutes = Math.floor((now - joinTime) / (1000 * 60));

        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes === 1) return "1 minute ago";
        return `${diffInMinutes} minutes ago`;
    } catch (error) {
        console.error(error);
        return "Recently";
    }
};
