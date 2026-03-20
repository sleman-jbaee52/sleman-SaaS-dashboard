// src/components/HeroSection.tsx
import React from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * Hero Section Component
 * - Main landing page section
 * - Features animated text and visuals
 * - Responsive design for all screen sizes
 * - Modern SaaS aesthetic
 */
const HeroSection: React.FC = () => {
  // Animation variants for staggered effects
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const navigate = useNavigate();
  const [showDemo, setShowDemo] = React.useState(false);

  return (
    /**
     * Hero Section Container
     * - Full viewport height
     * - Gradient background
     * - Centered content
     */
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px),
                              linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge/Tag */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
              New Version 2.0 Released
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl leading-tight font-bold text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white"
          >
            Build Your SaaS
            <br />
            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Faster Than Ever
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl md:text-2xl dark:text-slate-300"
          >
            The complete platform for building, scaling, and managing your SaaS
            business.
            <br className="hidden sm:block" />
            Join thousands of developers and entrepreneurs today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all hover:bg-indigo-700"
            >
              <span>Get Started Free</span>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDemo(true)}
              className="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 font-semibold text-slate-900 transition-all hover:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-indigo-500"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4"
          >
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
                10K+
              </div>
              <div className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
                Active Users
              </div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
                99.9%
              </div>
              <div className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
                Uptime
              </div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
                500+
              </div>
              <div className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
                Integrations
              </div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
                24/7
              </div>
              <div className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
                Support
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 justify-center rounded-full border-2 border-slate-400 pt-2 dark:border-slate-600"
        >
          <div className="h-3 w-1 rounded-full bg-slate-400 dark:bg-slate-600" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="relative w-[90vw] max-w-2xl rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 text-2xl text-slate-400 hover:text-red-600"
              >
                ×
              </button>
              <div className="aspect-w-16 aspect-h-9 mb-4 flex w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-100 dark:bg-slate-800">
                <iframe
                  src="https://www.youtube.com/embed/fq4N0hgOWzU"
                  title="SaaS Dashboard Demo"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="h-full w-full rounded-xl bg-transparent"
                  onError={(e) => {
                    // Fallback if the iframe fails to load (rare, YouTube normally handles this)
                    (e.target as HTMLIFrameElement).style.display = "none";
                    const fallback = document.getElementById(
                      "demo-video-fallback",
                    );
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                {/* Fallback message on error */}
                <div
                  id="demo-video-fallback"
                  style={{ display: "none" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-center text-lg font-medium text-slate-500 dark:text-slate-300">
                    Failed to load the video.
                    <br />
                    Please check your internet connection or try again later
                  </span>
                </div>
              </div>
              <p className="text-center font-medium text-slate-700 dark:text-slate-200">
                Watch the modern SaaS Dashboard demo – a quick practical
                showcase
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
