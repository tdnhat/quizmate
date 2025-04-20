import { useState, useEffect } from "react";

interface AuthorInfoProps {
    displayName?: string;
    avatarUrl?: string;
    userName?: string;
}

const AuthorInfo = ({ displayName, avatarUrl, userName }: AuthorInfoProps) => {
    const [showInitials, setShowInitials] = useState(true);

    useEffect(() => {
        if (avatarUrl) {
            setShowInitials(false);
        }
    }, [avatarUrl]);

    const getInitials = () => {
        if (!displayName) return "?";

        return displayName.split(/[-\s]/)[0].charAt(0).toUpperCase() || "?";
    };

    if (!displayName || !userName) {
        return (
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-semibold">
                    ?
                </div>
                <span className="text-xs text-gray-600 truncate max-w-[100px]">
                    Unknown
                </span>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2">
            {!showInitials && avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-6 h-6 rounded-full"
                    onError={() => setShowInitials(true)}
                />
            ) : (
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold">
                    {getInitials()}
                </div>
            )}
            <span className="text-xs text-gray-600 truncate max-w-[100px]">
                {displayName}
            </span>
        </div>
    );
};

export default AuthorInfo;
