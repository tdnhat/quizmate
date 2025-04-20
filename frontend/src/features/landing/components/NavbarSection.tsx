import { useAuth } from "@/features/auth/hooks/useAuth";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { isAuthenticated } = useAuth();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-20">
                <div className="flex items-center gap-4 md:gap-8">
                    <Link to="/">
                        <img
                            src="/Logo.svg"
                            alt="QuizMate Logo"
                            className="h-8 md:h-10 w-auto"
                        />
                    </Link>
                    <div className="hidden md:flex items-center gap-4 font-medium">
                        <Link to="/#features">
                            <span
                                className="text-gray-500 hover:text-gray-900 transition cursor-pointer"
                                onClick={() => scrollToSection("features")}
                            >
                                Features
                            </span>
                        </Link>
                        <Link to="/#testimonials">
                            <span
                                className="text-gray-500 hover:text-gray-900 transition"
                                onClick={() => scrollToSection("testimonials")}
                            >
                                Testimonials
                            </span>
                        </Link>
                        <Link to="/#pricing">
                            <span
                                className="text-gray-500 hover:text-gray-900 transition"
                                onClick={() => scrollToSection("pricing")}
                            >
                                Pricing
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-4">
                    {isAuthenticated ? (
                        <Link to="/home">
                            <button className="flex items-center w-32 justify-center gap-2 bg-white text-gray-500 cursor-pointer font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition">
                                Home
                                <ChevronRightIcon className="ml-2 w-4 h-4" />
                            </button>
                        </Link>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="text-gray-500 font-medium py-2 px-4 rounded-lg hover:text-gray-900 hover:cursor-pointer transition">
                                    Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-cyan-700 hover:cursor-pointer transition">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile navigation - only show register/home button */}
                <div className="md:hidden">
                    {isAuthenticated ? (
                        <Link to="/home">
                            <button className="flex items-center justify-center gap-2 bg-white text-gray-500 cursor-pointer font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition">
                                Home
                                <ChevronRightIcon className="w-4 h-4" />
                            </button>
                        </Link>
                    ) : (
                        <Link to="/register">
                            <button className="bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-cyan-700 hover:cursor-pointer transition">
                                Register
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
