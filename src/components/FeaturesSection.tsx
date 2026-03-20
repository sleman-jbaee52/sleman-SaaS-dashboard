// src/components/FeaturesSection.tsx
import React from "react";
import { motion } from "framer-motion";

/**
 * Feature Item Interface
 * Defines the structure of each feature card
 */
interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

/**
 * Features Data
 * Array of feature items with icons and descriptions
 */
const featuresData: FeatureItem[] = [
  {
    id: 1,
    title: "Fast Performance",
    description:
      "Lightning-fast load times and optimized performance for the best user experience.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 2,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with end-to-end encryption and 99.9% uptime guarantee.",
    icon: (
      <svg
        className="h-8 w-8"
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
    ),
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "Easy Integration",
    description:
      "Seamlessly integrate with your existing tools and workflows in minutes.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description:
      "Comprehensive analytics and insights to track your business growth.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to help you whenever you need assistance.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    color: "from-red-500 to-rose-500",
  },
  {
    id: 6,
    title: "Cloud Storage",
    description:
      "Unlimited cloud storage with automatic backups and data synchronization.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
    color: "from-indigo-500 to-blue-500",
  },
];

/**
 * Features Section Component
 * - Displays feature cards in a grid layout
 * - Responsive design for all screen sizes
 * - Hover animations and effects
 * - Dark mode support
 */
const FeaturesSection: React.FC = () => {
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

  return (
    /**
     * Features Section Container
     * - Full width section
     * - Gradient background
     * - Centered content
     */
    <section
      id="features-section"
      className="relative overflow-hidden bg-white py-24 dark:bg-slate-900"
    >
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16 text-center"
        >
          <motion.span
            variants={itemVariants}
            className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
          >
            Features
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl dark:text-white"
          >
            Everything You Need to Succeed
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300"
          >
            Powerful features designed to help you build, scale, and manage your
            business efficiently.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            >
              {/* Gradient Border Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              />

              {/* Icon Container */}
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} mb-6 text-white transition-transform duration-300 group-hover:scale-110`}
              >
                {feature.icon}
              </div>

              {/* Feature Title */}
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>

              {/* Arrow Icon on Hover */}
              <div className="absolute right-6 bottom-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-slate-600 dark:text-slate-300">
            Ready to get started? Explore all features and see what we have to
            offer.
          </p>
          <button
            onClick={() => {
              document.getElementById("features-section")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700"
          >
            View All Features
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
