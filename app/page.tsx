import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CostEstimatorSection from "./components/CostEstimatorSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/footer";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <CostEstimatorSection />
      <AboutSection />
      <WhyChooseUsSection />
      <FAQSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}