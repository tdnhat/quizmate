// Helper functions
export const getPositionColor = (position: number): string => {
    switch (position) {
        case 0:
            return "bg-amber-500"; // Gold
        case 1:
            return "bg-slate-400"; // Silver
        case 2:
            return "bg-amber-700"; // Bronze
        default:
            return "bg-gray-500";
    }
};

export const getGradientColor = (position: number): string => {
    switch (position) {
        case 0:
            return "from-amber-400 to-amber-600"; // Gold
        case 1:
            return "from-slate-300 to-slate-500"; // Silver
        case 2:
            return "from-amber-600 to-amber-800"; // Bronze
        default:
            return "from-gray-400 to-gray-600";
    }
};

export const getPositionLabel = (position: number): string => {
    switch (position) {
        case 0:
            return "1st";
        case 1:
            return "2nd";
        case 2:
            return "3rd";
        default:
            return `${position + 1}th`;
    }
};