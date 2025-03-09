import { Link } from "react-router-dom";

const NavbarLogo = () => {
    return (
        <div className="flex items-center gap-4 md:gap-8">
            <Link to="/">
                <img
                    src="/Logo.svg"
                    alt="QuizMate Logo"
                    className="h-8 w-auto"
                />
            </Link>
        </div>
    );
};

export default NavbarLogo;
