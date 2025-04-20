import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

const CTASection = () => {
    const containerVariants = {
        hidden: { 
            opacity: 0,
            y: 30
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hover: { 
            scale: 1.05,
            x: 10,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        tap: { 
            scale: 0.95
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-cyan-500 to-cyan-600">
            <motion.div 
                className="max-w-4xl mx-auto px-8 sm:px-6 lg:px-8 text-center text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Create Your First Quiz?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    Join thousands of educators and content creators who are already using our platform.
                </p>
                <Link to="/">
                    <motion.button 
                        className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:shadow-lg transition-shadow"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Get Started Now
                        <MoveRight size={20} />
                    </motion.button>
                </Link>
            </motion.div>
        </section>
    );
};

export default CTASection;
