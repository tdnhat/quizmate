import QuizCodeEntry from "./QuizCodeEntry";
import { useNavigate } from "react-router-dom";
const NavbarJoinCode = () => {
    const navigate = useNavigate();
    const handleJoinQuiz = (code: string) => {
        navigate(`/join/${code}`);
    };

    return (
        <div className="items-center hidden md:flex">
            {/* Hidden between md (768px) and custom (900px) breakpoint */}
            <h3 className="whitespace-nowrap mr-4 font-semibold text-cyan-600 hidden lg:block">
                Join game? Enter PIN:
            </h3>
            <QuizCodeEntry onJoin={handleJoinQuiz} />
        </div>
    );
};

export default NavbarJoinCode;
