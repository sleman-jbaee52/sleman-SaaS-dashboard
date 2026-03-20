// src/pages/PricingPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";

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
 * Pricing Page Component
 * - Dedicated pricing page
 * - Monthly/Yearly toggle
 * - Popular plan highlighting
 * - Responsive design
 * - Lucide React icons
 * - Framer Motion animations
 */
const PricingPage: React.FC = () => {
  // State for billing cycle toggle
  const [isYearly, setIsYearly] = useState(false);

  // Animation variants
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

  return (
    /**
     * Main Container
     * - Full viewport height
     * - Smooth background gradient
     */
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero for Pricing Page */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background Gradient */}
        <div className="from-indigo-20000 absolute inset-0 bg-gradient-to-r via-purple-800 to-pink-900" />

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-white/20 blur-3xl"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-white/20 blur-3xl"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/10 blur-3xl"
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                                linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
          >
            <Star className="h-4 w-4" />
            Choose Your Perfect Plan
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          >
            Simple, Transparent Pricing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-3xl text-xl text-white/90"
          >
            Flexible pricing options for teams of all sizes. Start free and
            scale as you grow.
          </motion.p>
        </div>
      </section>

      {/* Pricing Content */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-12 flex items-center justify-center gap-4"
          >
            <motion.span
              variants={itemVariants}
              className={`text-sm font-medium ${!isYearly ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
            >
              Monthly
            </motion.span>

            {/* Toggle Switch */}
            <motion.button
              variants={itemVariants}
              onClick={() => setIsYearly(!isYearly)}
              whileTap={{ scale: 0.95 }}
              className="relative h-8 w-14 rounded-full bg-slate-200 transition-colors duration-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:bg-slate-700"
              aria-label="Toggle billing cycle"
            >
              <motion.div
                animate={{ x: isYearly ? 24 : 4 }}
                className="absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300"
              />
            </motion.button>

            <motion.span
              variants={itemVariants}
              className={`text-sm font-medium ${isYearly ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
            >
              Yearly
              <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-300">
                Save 20%
              </span>
            </motion.span>
          </motion.div>

          {/* Pricing Cards Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {pricingPlans.map((plan, index) => (
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
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 transform"
                  >
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
                      Most Popular
                    </span>
                  </motion.div>
                )}

                {/* Pricing Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
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
                      <motion.span
                        key={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-slate-900 dark:text-white"
                      >
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </motion.span>
                      <motion.span
                        key={isYearly ? "/year" : "/month"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-2 text-slate-600 dark:text-slate-400"
                      >
                        {isYearly ? "/year" : "/month"}
                      </motion.span>
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-slate-500 dark:text-slate-400"
                      >
                        Billed ${plan.yearlyPrice} yearly
                      </motion.p>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1 + featureIndex * 0.05,
                        }}
                        className="flex items-start gap-3"
                      >
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all ${
                      plan.popular
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                    }`}
                  >
                    {plan.ctaText}
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mt-16"
          >
            <motion.div variants={itemVariants} className="mb-12 text-center">
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Have questions? Check our FAQ or contact our support team.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2"
            >
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
                <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                  Can I change my plan later?
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect immediately.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
                <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                  Is there a free trial?
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Yes, all paid plans come with a 14-day free trial. No credit
                  card required.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
                <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                  What payment methods do you accept?
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  We accept all major credit cards, PayPal, and bank transfers
                  for annual plans.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
                <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                  Is there a money-back guarantee?
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Yes, we offer a 30-day money-back guarantee on all paid plans.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mt-20 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="to-pink-20000 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-800 p-12 shadow-2xl"
            >
              <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Ready to Get Started?
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                Join thousands of teams already using our platform to build
                amazing products.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-white px-8 py-4 font-semibold text-indigo-600 shadow-lg transition-all hover:shadow-xl"
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
                >
                  Contact Sales
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
