import { Link } from "react-router-dom";
import Navbar from "./NavbarSection";
import { MoveRight } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="bg-cyan-50 py-10">
            <div className="mx-auto">
                <Navbar />
                <div className="flex flex-col md:flex-row items-center justify-center text-center">
                    <div className="mb-8 md:mb-0 max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-8">
                            Captivating{" "}
                            <span className=" bg-gradient-to-r from-cyan-500 to-blue-700 text-transparent bg-clip-text">
                                Quiz
                            </span>{" "}
                            Journeys
                        </h1>
                        <p className="text-2xl mb-8 text-gray-500 opacity-75">
                            Play, challenge, and level up with interactive
                            quizzes crafted <br /> to spark your curiosity and
                            boost your brainpower.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8 py-8 items-center justify-center">
                            <Link to="/">
                                <button className="w-[230px] bg-white font-medium py-3 px-6 rounded-lg shadow hover:cursor-pointer hover:text-blue-500 hover:shadow-md transition">
                                    Learn More
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="w-[230px] bg-cyan-500 font-medium text-white py-3 px-6 rounded-lg shadow hover:cursor-pointer hover:bg-cyan-600 hover:shadow-md transition">
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Get Started</span>
                                        <MoveRight size={16} />
                                    </div>
                                </button>
                            </Link>
                        </div>
                        <img
                            src="/landing_image.png"
                            alt="Hero"
                            className="w-full h-auto mx-auto rounded-xl shadow-lg mb-8"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
