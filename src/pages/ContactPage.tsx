// src/pages/ContactPage.tsx
import React, { useState } from "react";

// src/components/ContactSection.tsx
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Linkedin,
  Disc,
  CheckCircle,
  Send,
} from "lucide-react";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

/**
 * Contact Form State Interface
 * Defines the structure of form data
 */
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Contact Info Interface
 * Defines the structure of contact information
 */
interface ContactInfo {
  id: number;
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
}

/**
 * Contact Form Data
 * Array of contact information with icons
 */
const contactInfo: ContactInfo[] = [
  {
    id: 1,
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    value: "hello@sleman.com",
    href: "mailto:hello@sleman.com",
  },
  {
    id: 2,
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    id: 3,
    icon: <MapPin className="h-6 w-6" />,
    title: "Address",
    value: "123 SaaS Street, Tech City, TC 12345",
    href: "#",
  },
];

/**
 * Social Media Links Data
 * Array of social media platforms with icons
 */
const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: <Twitter className="h-5 w-5" />,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "Discord",
    href: "https://discord.com",
    icon: <Disc className="h-5 w-5" />,
  },
];

/**
 * Contact Section Component
 * - Displays contact form and information
 * - Form validation
 * - Success message on submit
 * - Responsive design for all screen sizes
 * - Dark mode support
 */
const ContactSection: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

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

  /**
   * Handle form input change
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    /**
     * Contact Section Container
     * - Full width section
     * - Gradient background
     * - Centered content
     */

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
              Contact Us
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl dark:text-white"
            >
              Get In Touch
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300"
            >
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </motion.p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {contactInfo.map((info) => (
              <motion.a
                key={info.id}
                href={info.href}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-900/30 dark:text-indigo-400">
                  {info.icon}
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-slate-900 dark:text-white">
                    {info.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form and Info Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                  Send us a Message
                </h3>

                {/* Success Message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3 rounded-lg border border-green-300 bg-green-100 p-4 dark:border-green-700 dark:bg-green-900/30"
                  >
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-300">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full border bg-slate-50 px-4 py-3 dark:bg-slate-900 ${
                        errors.name
                          ? "border-red-500"
                          : "border-slate-300 dark:border-slate-600"
                      } rounded-lg text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border bg-slate-50 px-4 py-3 dark:bg-slate-900 ${
                        errors.email
                          ? "border-red-500"
                          : "border-slate-300 dark:border-slate-600"
                      } rounded-lg text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full border bg-slate-50 px-4 py-3 dark:bg-slate-900 ${
                        errors.subject
                          ? "border-red-500"
                          : "border-slate-300 dark:border-slate-600"
                      } rounded-lg text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full border bg-slate-50 px-4 py-3 dark:bg-slate-900 ${
                        errors.message
                          ? "border-red-500"
                          : "border-slate-300 dark:border-slate-600"
                      } resize-none rounded-lg text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 font-semibold transition-all ${
                      isSubmitting
                        ? "cursor-not-allowed bg-slate-400"
                        : "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.id}
                    href={info.href}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="group flex items-center gap-4 rounded-xl bg-slate-50 p-4 transition-all duration-300 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-900/20"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-900/30 dark:text-indigo-400">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-slate-900 dark:text-white">
                        {info.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Media Links */}
              <motion.div variants={itemVariants}>
                <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                  Follow Us
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:text-slate-300"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Office Hours */}
              <motion.div variants={itemVariants}>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                  <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
                    Office Hours
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Monday - Friday
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        9:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Saturday
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        10:00 AM - 4:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Sunday
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div variants={itemVariants}>
                <div className="relative h-48 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-2 h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        123 SaaS Street, Tech City
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;
