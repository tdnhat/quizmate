import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PricingSection = () => {
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

    const cardVariants = {
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
        <section id="pricing" className="py-20 bg-slate-50">
            <motion.div
                className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <motion.div
                    className="text-center mb-16"
                    variants={cardVariants}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose the plan that best fits your needs
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`
                                bg-white p-8 rounded-xl shadow-md flex flex-col h-full
                                ${plan.popular ? "border-cyan-500 border-2 shadow-lg relative" : "border-gray-200 border-2"}
                            `}
                            variants={cardVariants}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white text-xs md:text-sm font-bold py-1 px-3 rounded-full">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="flex-grow">
                                <h3 className="text-2xl font-bold mb-4">
                                    {plan.name}
                                </h3>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold">
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span className="text-gray-600 text-base md:text-lg">
                                            /{plan.period}
                                        </span>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center"
                                        >
                                            <Check
                                                className="text-green-500 mr-2"
                                                size={20}
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                className={`
                                    w-full mt-auto cursor-pointer border border-cyan-500 py-2 rounded-lg font-medium
                                    ${
                                        plan.popular
                                            ? "bg-cyan-600 text-white hover:bg-cyan-700"
                                            : "bg-white text-cyan-500 hover:bg-cyan-50"
                                    } transition
                                `}
                            >
                                {plan.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default PricingSection;
