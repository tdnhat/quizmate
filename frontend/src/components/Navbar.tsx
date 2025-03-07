import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between px-8 py-4 shadow z-9999">
            <div className="flex items-center gap-8">
                <Link to="/">
                    <img
                        src="/Logo.svg"
                        alt="QuizMate Logo"
                        className="h-8 w-auto"
                    />
                </Link>
            </div>
            <div></div>
        </div>
    );
};

export default Navbar;
