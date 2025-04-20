import Footer from "@/features/landing/components/FooterSection";
import CTASection from "@/features/landing/components/CTASection";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import HeroSection from "@/features/landing/components/HeroSection";
import PricingSection from "@/features/landing/components/PricingSection";
import TestimonialsSection from "@/features/landing/components/TestimonialsSection";
import { motion } from "framer-motion";

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const sectionVariants = {
        hidden: { 
            opacity: 0,
            y: 20
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div 
            className="landing-page scroll-smooth"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={sectionVariants}>
                <HeroSection />
            </motion.div>
            <motion.div variants={sectionVariants}>
                <FeaturesSection />
            </motion.div>
            <motion.div variants={sectionVariants}>
                <TestimonialsSection />
            </motion.div>
            <motion.div variants={sectionVariants}>
                <PricingSection />
            </motion.div>
            <motion.div variants={sectionVariants}>
                <CTASection />
            </motion.div>
            <motion.div variants={sectionVariants}>
                <Footer />
            </motion.div>
        </motion.div>
    );
};

export default LandingPage;
