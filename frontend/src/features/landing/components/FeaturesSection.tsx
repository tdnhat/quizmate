import { motion } from "framer-motion";

const FeaturesSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const featureVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <section id="features" className="bg-white py-12 md:py-20">
            <motion.div
                className="container mx-auto max-w-4xl px-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="flex flex-col items-center gap-8 md:gap-12 text-center">
                    <motion.div
                        variants={featureVariants}
                        className="mb-8 md:mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold my-4">
                            Loved by Quiz Creators
                        </h2>
                        <p className="opacity-75 text-gray-500 text-lg md:text-xl">
                            Easily craft your quizzes in one intuitive platform.
                        </p>
                    </motion.div>

                    {/* Feature 1 */}
                    <motion.div
                        variants={featureVariants}
                        className="flex flex-col md:flex-row items-center justify-between md:gap-12 lg:gap-24"
                    >
                        <div className="flex flex-col items-start gap-4 order-2 md:order-1 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-medium w-full">
                                Stay on Top of the Game
                            </h2>
                            <p className="opacity-75 text-gray-500 text-lg md:text-xl">
                                Fuel engagement with our dynamic
                                leaderboard—track top scorers, ignite friendly
                                competition, and watch your audience compete in
                                real time.
                            </p>
                        </div>
                        <div className="w-full md:w-auto mb-6 md:mb-0 order-1 md:order-2">
                            <img
                                src="/landing_feature_1.svg"
                                alt="Feature 1"
                                className="h-64 md:h-64 mx-auto"
                            />
                        </div>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        variants={featureVariants}
                        className="flex flex-col md:flex-row items-center justify-between md:gap-12 lg:gap-24"
                    >
                        <div className="w-full md:w-auto mb-6 md:mb-0">
                            <img
                                src="/landing_feature_2.svg"
                                alt="Feature 2"
                                className="h-64 md:h-64 mx-auto"
                            />
                        </div>
                        <div className="flex flex-col items-start gap-4 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-medium w-full">
                                Up-to-Date Quiz Topics
                            </h2>
                            <p className="opacity-75 text-gray-500 text-lg md:text-xl">
                                Stay current with our regularly updated quiz
                                library. From trending topics to timeless
                                classics, we offer diverse content to keep your
                                audience engaged and learning.
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        variants={featureVariants}
                        className="flex flex-col md:flex-row items-center justify-between md:gap-12 lg:gap-24"
                    >
                        <div className="flex flex-col items-start gap-4 order-2 md:order-1 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-medium w-full">
                                AI-Powered Question Generation
                            </h2>
                            <p className="opacity-75 text-gray-500 text-lg md:text-xl">
                                Never run out of ideas! Leverage our AI-driven
                                engine to instantly generate smart, engaging
                                questions that adapt to your quiz style.
                            </p>
                        </div>
                        <div className="w-full md:w-auto mb-6 md:mb-0 order-1 md:order-2">
                            <img
                                src="/landing_feature_3.svg"
                                alt="Feature 3"
                                className="h-64 md:h-64 mx-auto"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default FeaturesSection;
