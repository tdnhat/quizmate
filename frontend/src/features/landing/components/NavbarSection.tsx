import { useAuth } from "@/features/auth/hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="flex justify-between items-center mb-20 px-10">
            <div className="flex items-center gap-8">
                <Link to="/">
                    <img
                        src="/Logo.svg"
                        alt="QuizMate Logo"
                        className="h-10 w-auto"
                    />
                </Link>
                <div className="flex items-center gap-4 font-medium">
                    <Link to="/#features">
                        <span className="text-gray-500 hover:text-gray-900 transition">
                            Features
                        </span>
                    </Link>
                    <Link to="/#pricing">
                        <span className="text-gray-500 hover:text-gray-900 transition">
                            Pricing
                        </span>
                    </Link>
                    <Link to="/#about">
                        <span className="text-gray-500 hover:text-gray-900 transition">
                            About
                        </span>
                    </Link>
                </div>
            </div>
            {isAuthenticated ? (
                <Link to="/dashboard">
                    <button className="bg-cyan-500 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-cyan-600 transition">
                        Dashboard
                    </button>
                </Link>
            ) : (
                <div className="flex items-center gap-4">
                    <Link to="/login">
                        <button className="text-gray-500 font-medium py-2 px-4 rounded-lg hover:text-gray-900 hover:cursor-pointer transition">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="bg-cyan-500 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-cyan-600 hover:cursor-pointer transition">
                            Register
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
