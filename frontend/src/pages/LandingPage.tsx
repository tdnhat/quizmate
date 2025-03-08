import Footer from "@/features/landing/components/FooterSection";
import CTASection from "@/features/landing/components/CTASection";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import HeroSection from "@/features/landing/components/HeroSection";
import PricingSection from "@/features/landing/components/PricingSection";
import TestimonialsSection from "@/features/landing/components/TestimonialsSection";

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
