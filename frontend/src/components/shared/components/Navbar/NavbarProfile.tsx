import { useAuth } from "@/features/auth/hooks/useAuth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    BookOpen,
    HelpCircle,
    LogOut,
    User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [hasImageError, setHasImageError] = useState(false);

    console.log(user);

    const name = user?.displayName || user?.userName || "Guest";
    const avatarUrl = user?.avatarUrl || undefined;

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n.charAt(0))
            .join("")
            .toUpperCase();
    };

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative flex items-center justify-center w-8 h-8 rounded-full hover:cursor-pointer">
                    {!hasImageError && avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={name}
                            className="w-8 h-8 rounded-full"
                            onError={() => setHasImageError(true)}
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-cyan-600 flex items-center justify-center text-sm font-semibold">
                            {getInitials(name)}
                        </div>
                    )}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center px-3 py-2">
                    {/* Username Display */}
                    {!hasImageError && avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={name}
                            className="w-8 h-8 rounded-full"
                            onError={() => setHasImageError(true)}
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-cyan-600 flex items-center justify-center text-sm font-semibold">
                            {getInitials(name)}
                        </div>
                    )}
                    <div className="px-3 py-2 text-sm font-semibold tracking-wide text-gray-700 truncate">
                        {name}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/library")}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>My Quizzes</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() =>
                        window.open("https://quizmate.com/help", "_blank")
                    }
                >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NavbarProfile;
