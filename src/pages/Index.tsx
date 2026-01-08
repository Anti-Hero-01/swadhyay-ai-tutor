import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import SocialProofSection from "@/components/landing/SocialProofSection";
import FAQSection from "@/components/landing/FAQSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <SocialProofSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
};

export default Index;
