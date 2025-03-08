import { Link } from "react-router-dom";

const CTASection = () => (
    <section className="bg-cyan-50 py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
                Ready to Create Your First Quiz?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of educators and trainers who are already using
                QuizMate to engage their audience.
            </p>
            <Link to="/">
                <button className="w-[230px] bg-cyan-500 font-medium text-white py-3 px-6 rounded-lg shadow hover:cursor-pointer hover:bg-cyan-600 hover:shadow-md transition">
                    Create Quiz
                </button>
            </Link>
            <p className="mt-4 text-sm opacity-80">
                No credit card required. Free plan available.
            </p>
        </div>
    </section>
);

export default CTASection;
