const FeaturesSection = () => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex flex-col items-center gap-12 text-center">
                    <div className="mb-8">
                        <h2 className="text-4xl font-semibold my-4">
                            Loved by Quiz Creators
                        </h2>
                        <p className="opacity-75 text-gray-500 text-xl">
                            Easily craft your quizzes in one intuitive platform.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center justify-between gap-24">
                            <div className="flex flex-col items-start gap-4">
                                <h2 className="text-4xl font-medium text-left w-full">
                                    Stay on Top of the Game
                                </h2>
                                <p className="opacity-75 text-gray-500 text-xl text-left">
                                    Fuel engagement with our dynamic
                                    leaderboard—track top scorers, ignite
                                    friendly competition, and watch your
                                    audience compete in real time.
                                </p>
                            </div>
                            <img
                                src="/landing_feature_1.svg"
                                alt="Feature 1"
                                className="h-64"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center justify-between gap-24">
                            <img
                                src="/landing_feature_2.svg"
                                alt="Feature 2"
                                className="h-64"
                            />
                            <div className="flex flex-col items-start gap-4">
                                <h2 className="text-4xl font-medium text-left w-full">
                                    All-In-One Dashboard
                                </h2>
                                <p className="opacity-75 text-gray-500 text-xl text-left">
                                    Keep everything under one roof. Our
                                    intuitive dashboard gives you a birds-eye
                                    view of your quiz performance, analytics,
                                    and user engagement, making it easier than
                                    ever to optimize your content.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center justify-between gap-24">
                            <div className="flex flex-col items-start gap-4">
                                <h2 className="text-4xl font-medium text-left w-full">
                                    AI-Powered
                                    <br /> Question Generation
                                </h2>
                                <p className="opacity-75 text-gray-500 text-xl text-left">
                                    Never run out of ideas! Leverage our
                                    AI-driven engine to instantly generate
                                    smart, engaging questions that adapt to your
                                    quiz style, ensuring every quiz is a hit.
                                </p>
                            </div>
                            <img
                                src="/landing_feature_3.svg"
                                alt="Feature 3"
                                className="h-64"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
