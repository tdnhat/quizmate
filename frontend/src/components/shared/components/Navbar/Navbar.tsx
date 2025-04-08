import NavbarProfile from "./NavbarProfile";
import {
    BellIcon,
    MenuIcon,
    House,
    Layers,
    BookCheck,
    BarChart2,
    Settings,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavbarSearch from "./NavbarSearch";
import NavbarLogo from "./NavbarLogo";
import { NavbarCreate } from "./NavbarCreate";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface NavbarProps {
    className?: string;
    isMobileMenuOpen?: boolean;
    onMobileMenuOpen?: (isOpen: boolean) => void;
}

const Navbar = ({ className, onMobileMenuOpen }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleMobileMenuOpen = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onMobileMenuOpen?.(newState);
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const navItems = [
        { icon: House, name: "Home", path: "/home" },
        { icon: Layers, name: "Categories", path: "/categories" },
        { icon: BookCheck, name: "Quizzes", path: "/quizzes" },
        { icon: BarChart2, name: "Reports", path: "/reports" },
        { icon: Settings, name: "Settings", path: "/settings" },
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <>
            <div
                className={cn(
                    "flex items-center justify-between px-4 md:px-8 py-3 shadow-sm border-b border-gray-100 bg-white sticky top-0 z-50 h-16",
                    className
                )}
            >
                <NavbarLogo />

                {isAuthenticated && (
                    <>
                        <NavbarSearch />

                        <div className="flex items-center gap-2 md:gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-600"
                            >
                                <BellIcon className="h-5 w-5" />
                            </Button>

                            <NavbarCreate />

                            <NavbarProfile />

                            {/* Hamburger toggle for small screens */}
                            <div className="md:hidden">
                                <button
                                    onClick={handleMobileMenuOpen}
                                    className="text-slate-700"
                                    aria-label="Toggle Menu"
                                >
                                    <MenuIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {isAuthenticated && (
                <div
                    className={cn(
                        "md:hidden overflow-hidden transition-all duration-500 ease-in-out transform",
                        isOpen
                            ? "max-h-[500px] opacity-100 translate-y-0 mt-16"
                            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
                    )}
                >
                    <div className="px-4 py-2 border-b bg-white shadow-sm space-y-2">
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => {
                                        handleNavigation(item.path);
                                        setIsOpen(false);
                                        onMobileMenuOpen?.(false);
                                    }}
                                    className="flex items-center gap-2 rounded px-2 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                                >
                                    <item.icon className="h-4 w-4 text-cyan-600" />
                                    <span>{item.name}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="pt-2 border-t">
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                    onMobileMenuOpen?.(false);
                                }}
                                className="flex items-center gap-2 rounded px-2 py-2 text-left text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
