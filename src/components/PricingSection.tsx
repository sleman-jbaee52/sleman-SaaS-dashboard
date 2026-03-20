// src/components/PricingSection.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ContactSalesModal from "./ContactSalesModal";
/**
 * Pricing Plan Interface
 * Defines the structure of each pricing plan
 */
interface PricingPlan {
  id: number;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
  ctaText: string;
}

/**
 * Pricing Plans Data
 * Array of pricing plans with features and pricing
 */
const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Starter",
    description: "Perfect for individuals and small projects",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "48-hour support response",
      "1GB storage",
      "Community access",
    ],
    ctaText: "Get Started Free",
  },
  {
    id: 2,
    name: "Professional",
    description: "Ideal for growing teams and businesses",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response",
      "10GB storage",
      "Priority support",
      "Custom integrations",
      "Team collaboration",
    ],
    popular: true,
    ctaText: "Start Free Trial",
  },
  {
    id: 3,
    name: "Enterprise",
    description: "For large organizations with custom needs",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Everything in Professional",
      "Unlimited storage",
      "1-hour support response",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Advanced security",
      "API access",
    ],
    ctaText: "Contact Sales",
  },
];

/**
 * Pricing Section Component
 * - Displays pricing plans in a grid layout
 * - Toggle for monthly/yearly pricing
 * - Responsive design for all screen sizes
 * - Popular plan highlighting
 * - Dark mode support
 */
const PricingSection: React.FC = () => {
  // State for billing cycle toggle
  const [isYearly, setIsYearly] = useState(false);

  // Animation variants for staggered effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    /**
     * Pricing Section Container
     * - Full width section
     * - Gradient background
     * - Centered content
     */
    <section
      id="faq-section"
      className="relative overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 py-24 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-12 text-center"
        >
          <motion.span
            variants={itemVariants}
            className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
          >
            Pricing Plans
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl dark:text-white"
          >
            Choose Your Perfect Plan
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300"
          >
            Flexible pricing options for teams of all sizes. Start free and
            scale as you grow.
          </motion.p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mb-12 flex items-center justify-center gap-4"
        >
          <span
            className={`text-sm font-medium ${!isYearly ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
          >
            Monthly
          </span>

          {/* Toggle Switch */}
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative h-8 w-14 rounded-full bg-slate-200 transition-colors duration-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:bg-slate-700"
            aria-label="Toggle billing cycle"
          >
            <motion.div
              animate={{ x: isYearly ? 24 : 4 }}
              className="absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300"
            />
          </button>

          <span
            className={`text-sm font-medium ${isYearly ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
          >
            Yearly
            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-300">
              Save 20%
            </span>
          </span>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`group relative ${
                plan.popular ? "z-10 md:scale-105 lg:scale-105" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 transform">
                  <span className="inline-flex items-center rounded-full bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Pricing Card */}
              <div
                className={`relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 dark:bg-slate-800 ${
                  plan.popular
                    ? "border-2 border-indigo-600 shadow-xl shadow-indigo-500/20 dark:border-indigo-500"
                    : "border border-slate-200 dark:border-slate-700"
                }`}
              >
                {/* Plan Name */}
                <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>

                {/* Plan Description */}
                <p className="mb-6 text-slate-600 dark:text-slate-300">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-slate-900 dark:text-white">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="ml-2 text-slate-600 dark:text-slate-400">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Billed ${plan.yearlyPrice} yearly
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <svg
                        className="hrink-0 mt-0.5 h-5 w-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (plan.id === 1) {
                      navigate("/signup");
                    } else if (plan.id === 2) {
                      navigate("/signup?trial=1");
                    } else if (plan.id === 3) {
                      setShowContactModal(true);
                    }
                  }}
                  className={`w-full rounded-xl px-6 py-3 font-semibold transition-all ${
                    plan.popular
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                  }`}
                >
                  {plan.ctaText}
                </motion.button>
              </div>
            </motion.div>
          ))}

          <ContactSalesModal
            open={showContactModal}
            onClose={() => setShowContactModal(false)}
          />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            Have Questions?
          </h3>
          <p className="mb-6 text-slate-600 dark:text-slate-300">
            Check our FAQ or contact our support team for assistance.
          </p>
          <button
            onClick={() => {
              document
                .getElementById("faq-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            View FAQ →
          </button>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400"
        >
          <svg
            className="h-5 w-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>30-day money-back guarantee on all plans</span>
        </motion.div>
      </div>
    </section>
  );
};
export default PricingSection;
