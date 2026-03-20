// src/pages/HomePage.tsx

import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";

/**
 * Home Page Component
 * - Main landing page
 * - Combines all sections
 */
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <HeroSection />

      <section id="features">
        <FeaturesSection />
      </section>

      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
