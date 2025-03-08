import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const PricingSection = () => {
    const plans = [
        {
            name: "Basic",
            price: "Free",
            features: [
                "5 quizzes per month",
                "Basic analytics",
                "Up to 50 responses",
                "Email support",
            ],
            cta: "Get Started",
            popular: false,
        },
        {
            name: "Pro",
            price: "$15",
            period: "per month",
            features: [
                "Unlimited quizzes",
                "Advanced analytics",
                "Unlimited responses",
                "Priority support",
                "Custom branding",
            ],
            cta: "Try Pro",
            popular: true,
        },
        {
            name: "Team",
            price: "$49",
            period: "per month",
            features: [
                "Everything in Pro",
                "5 team members",
                "Team management",
                "Shared quiz library",
                "API access",
            ],
            cta: "Contact Sales",
            popular: false,
        },
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Pricing Plans
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Choose the plan that works best for you and your team.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`
                border rounded-xl p-8 flex flex-col h-full 
                ${plan.popular ? "border-cyan-500 shadow-lg relative" : "border-gray-200"}
            `}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-cyan-500 text-white text-sm font-bold py-1 px-3 rounded-bl-lg rounded-tr-lg">
                                    MOST POPULAR
                                </div>
                            )}

                            <h3 className="text-xl font-bold mb-2">
                                {plan.name}
                            </h3>

                            <div className="mb-6">
                                <span className="text-4xl font-bold">
                                    {plan.price}
                                </span>
                                {plan.period && (
                                    <span className="text-gray-600">
                                        /{plan.period}
                                    </span>
                                )}
                            </div>

                            <ul className="mb-8 space-y-3 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <Check size={20} className="mr-2" color="green" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/">
                                <button
                                    className={`
                                    w-full py-3 px-4 rounded-lg font-bold mt-auto hover:cursor-pointer
                                    ${
                                        plan.popular
                                            ? "bg-cyan-600 text-white hover:bg-cyan-700"
                                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    } transition
                                    `}
                                >
                                    {plan.cta}
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
