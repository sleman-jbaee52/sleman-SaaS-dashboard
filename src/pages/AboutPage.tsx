// src/components/AboutSection.tsx
import React from "react";
import { motion } from "framer-motion";


/**
 * Team Member Interface
 * Defines the structure of each team member
 */
interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

/**
 * Team Members Data
 * Array of team member information
 */
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO & Founder",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "10+ years of experience in SaaS development and business strategy.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Former lead engineer at major tech companies, passionate about innovation.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Head of Product",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Expert in user experience and product design with 8+ years experience.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Lead Developer",
    avatar: "https://i.pravatar.cc/150?img=4",
    bio: "Full-stack developer specializing in React and modern web technologies.",
  },
];

/**
 * About Section Component
 * - Displays company information and team
 * - Responsive design for all screen sizes
 * - Statistics section
 * - Dark mode support
 */
const AboutSection: React.FC = () => {
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
     * About Section Container
     * - Full width section
     * - Gradient background
     * - Centered content
     */
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
 
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
        {/* Background Gradient Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4"
            >
              About Us
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Building the Future of SaaS
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              We're a team of passionate developers and designers dedicated to
              creating the best SaaS platform for businesses worldwide.
            </motion.p>
          </motion.div>

          {/* Company Story */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          >
            {/* Image Side */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team working together"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl"
              >
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  5+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Years of Excellence
                </div>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                At Sleman, we believe in empowering businesses with the right
                tools to succeed. Our platform is designed to streamline
                operations, enhance productivity, and drive growth for companies
                of all sizes.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Founded in 2019, we've helped over 10,000 businesses transform
                their operations and achieve their goals. Our commitment to
                innovation and customer success drives everything we do.
              </p>

              {/* Key Points */}
              <ul className="space-y-3">
                {[
                  "Industry-leading security and compliance",
                  "24/7 dedicated support team",
                  "Continuous product innovation",
                  "Seamless integrations with your tools",
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
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
                    <span className="text-slate-600 dark:text-slate-300">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {[
              { value: "10K+", label: "Active Users" },
              { value: "500+", label: "Companies" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg"
              >
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Meet Our Team
              </h3>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Our talented team of professionals is dedicated to delivering
                the best experience for our customers.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                >
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-indigo-100 dark:border-indigo-900"
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800" />
                  </div>

                  {/* Name & Role */}
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {member.name}
                  </h4>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm mb-3">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Join Us?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Start your journey with Sleman today and experience the
              difference.
            </p>
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30">
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutSection;
