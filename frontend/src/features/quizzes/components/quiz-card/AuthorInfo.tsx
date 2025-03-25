import { User } from "@/types/user";
import { useState, useEffect } from "react";

interface AuthorInfoProps {
    author?: User;
}

const AuthorInfo = ({ author }: AuthorInfoProps) => {
    const [showInitials, setShowInitials] = useState(true);

    useEffect(() => {
        if (author && author.avatarUrl) {
            setShowInitials(false);
        }
    }, [author]);

    const getInitials = () => {
        if (!author || !author.userName) return "?";

        return (
            author.userName
                .split(/[-\s]/)[0]
                .charAt(0)
                .toUpperCase() || "?"
        );
    };

    if (!author || !author.userName) {
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
            {!showInitials && author.avatarUrl ? (
                <img
                    src={author.avatarUrl}
                    alt={author.userName}
                    className="w-6 h-6 rounded-full"
                    onError={() => setShowInitials(true)}
                />
            ) : (
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold">
                    {getInitials()}
                </div>
            )}
            <span className="text-xs text-gray-600 truncate max-w-[100px]">
                {author.userName}
            </span>
        </div>
    );
};

export default AuthorInfo;
