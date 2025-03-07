import Footer from "@/components/landing/Footer";
import CTASection from "@/components/landing/CTASection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
            <Footer />
        </div>
    );
};

export default LandingPage;
