import { Link } from "react-router-dom";
import Navbar from "./NavbarSection";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    const contentVariants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2,
            },
        },
    };

    return (
        <section className="bg-cyan-50 py-10">
            <div className="mx-auto px-8">
                <Navbar />
                <div className="flex flex-col items-center justify-center">
                    <motion.div
                        className="w-full max-w-4xl text-center mb-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={contentVariants}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 md:mb-8">
                            Captivating{" "}
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-700 text-transparent bg-clip-text">
                                Quiz
                            </span>{" "}
                            Journeys
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-gray-500 opacity-75 max-w-3xl mx-auto">
                            Play, challenge, and level up with interactive
                            quizzes crafted to spark your curiosity and boost
                            your brainpower.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/#features"
                                className="w-full sm:w-[230px]"
                                onClick={() => scrollToSection("features")}
                            >
                                <div className="w-full bg-white font-medium py-3 px-6 rounded-lg shadow hover:cursor-pointer hover:text-blue-500 hover:shadow-md transition">
                                    Learn More
                                </div>
                            </Link>
                            <Link
                                to="/register"
                                className="w-full sm:w-[230px]"
                            >
                                <div className="w-full bg-cyan-600 font-medium text-white py-3 px-6 rounded-lg shadow hover:cursor-pointer hover:bg-cyan-700 hover:shadow-md transition">
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Get Started</span>
                                        <MoveRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        className="w-full max-w-4xl mt-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={imageVariants}
                    >
                        <img
                            src="/landing_image.png"
                            alt="Hero"
                            className="w-full h-auto mx-auto rounded-xl shadow-lg"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
