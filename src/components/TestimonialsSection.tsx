// src/components/TestimonialsSection.tsx

import React from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
/**
 * Testimonial Interface
 * Defines the structure of each testimonial card
 */
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  companyLogo?: string;
}

/**
 * Testimonials Data
 * Array of customer testimonials with ratings and avatars
 */
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO & Founder",
    company: "TechStart Inc.",
    avatar: "https://i.pravatar.cc/150?img=1",
    content:
      "This platform has completely transformed how we manage our SaaS business. The features are intuitive, the support is exceptional, and the ROI has been incredible. Highly recommended for any growing business.",
    rating: 5,
    companyLogo: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateLab",
    avatar: "https://i.pravatar.cc/150?img=2",
    content:
      "We switched to this platform 6 months ago and haven't looked back. The analytics dashboard alone has saved us countless hours. The team collaboration features are a game-changer for our remote team.",
    rating: 5,
    companyLogo: "https://cdn-icons-png.flaticon.com/512/2991/2991179.png",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "CTO",
    company: "CloudScale",
    avatar: "https://i.pravatar.cc/150?img=3",
    content:
      "As a technical leader, I've evaluated dozens of platforms. This one stands out for its performance, security, and ease of integration. Our development team loves working with it daily.",
    rating: 5,
    companyLogo: "https://cdn-icons-png.flaticon.com/512/2991/2991196.png",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Marketing Director",
    company: "GrowthHub",
    avatar: "https://i.pravatar.cc/150?img=4",
    content:
      "The marketing automation features have doubled our conversion rates. The customer support team is always responsive and helpful. This is the best investment we've made this year.",
    rating: 5,
    companyLogo: "https://cdn-icons-png.flaticon.com/512/2991/2991208.png",
  },
  {
    id: 5,
    name: "Amanda Foster",
    role: "Operations Manager",
    company: "StreamlineCo",
    avatar: "https://i.pravatar.cc/150?img=5",
    content:
      "We've streamlined our entire workflow with this platform. The automation features save us 20+ hours per week. It's like having an extra team member without the overhead.",
    rating: 5,
    companyLogo: "https://cdn-icons-png.flaticon.com/512/2991/2991221.png",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Founder",
    company: "StartupX",
    avatar: "https://i.pravatar.cc/150?img=6",
    content:
      "From day one, this platform has been reliable and feature-rich. The pricing is transparent, and there are no hidden fees. Perfect for startups looking to scale quickly.",
    rating: 5,
    companyLogo: "https://cdn-icons-png.flaticon.com/512/2991/2991234.png",
  },
];

/**
 * Testimonials Section Component
 * - Displays customer testimonials in a grid layout
 * - Star ratings and company logos
 * - Responsive design for all screen sizes
 * - Dark mode support
 * - Smooth animations
 */
const TestimonialsSection: React.FC = () => {
  // State for testimonial slider

  // Animation variants for staggered effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Star rating component
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${
              i < rating
                ? "text-yellow-400"
                : "text-slate-300 dark:text-slate-600"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // ======
  const navigate = useNavigate();

  return (
    /**
     * Testimonials Section Container
     * - Full width section
     * - Gradient background
     * - Centered content
     */
    <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-900">
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
            Testimonials
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl dark:text-white"
          >
            Loved by Thousands of Customers
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300"
          >
            See what our customers have to say about their experience with our
            platform.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonialsData.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 transition-opacity group-hover:opacity-20">
                <svg
                  className="h-12 w-12 text-indigo-600 dark:text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
              </div>

              {/* Star Rating */}
              <div className="mb-4">{renderStars(testimonial.rating)}</div>

              {/* Testimonial Content */}
              <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                "{testimonial.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full border-2 border-indigo-500 object-cover"
                />

                {/* User Details */}
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                </div>

                {/* Company Logo */}
                {testimonial.companyLogo && (
                  <img
                    src={testimonial.companyLogo}
                    alt={testimonial.company}
                    className="h-10 w-10 opacity-70 transition-opacity hover:opacity-100"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-16 border-t border-slate-200 pt-12 dark:border-slate-700"
        >
          <p className="mb-8 text-center text-slate-600 dark:text-slate-400">
            Trusted by companies worldwide
          </p>

          {/* Company Logos Grid */}
          <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-4">
            {["Google", "Microsoft", "Amazon", "Meta"].map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-center"
              >
                <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                  <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                    {company}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            Ready to Join Our Happy Customers?
          </h3>
          <p className="mb-6 text-slate-600 dark:text-slate-300">
            Start your free trial today and experience the difference.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700"
          >
            Start Free Trial
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
