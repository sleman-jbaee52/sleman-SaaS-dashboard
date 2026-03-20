// src/pages/SignupPage.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../hooks/useAuth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import Logo from "../components/Logo";
// import { AUTH_PAGES } from "../utils/constants"; // not used

// Form validation schema
const signupSchema = z
  .object({
    email: z
      .string()
      .email("Please enter a valid email")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(64, "Password must be less than 64 characters"),
    confirmPassword: z.string(),
    displayName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [method, setMethod] = useState<"email" | "google">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();

  const { signupWithEmail, loginWithGoogle, loading, isAuthenticated, error } =
    useAuth();

  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = searchParams.get("redirectTo") || "/dashboard";
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password");

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      await signupWithEmail(data.email, data.password);
      // Wait brief moment for auth state to update
      setTimeout(() => {
        if (isAuthenticated) {
          const redirectTo = searchParams.get("redirectTo") || "/dashboard";
          navigate(redirectTo);
        }
      }, 500);
    } catch (error: unknown) {
      console.error("Signup error:", error);
      // Error handled in context - no navigation
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsSubmitting(true);
    try {
      await loginWithGoogle(); // Same as login for Google
    } catch (error) {
      console.error("Google signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-indigo-600 mb-4" />
          <p className="text-slate-600 dark:text-slate-300">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20 px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
            <Logo size="lg" className="text-white drop-shadow-lg" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-700 dark:from-white dark:via-purple-200 dark:to-slate-200 bg-clip-text text-transparent mb-4">
            Join Us Today
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-sm mx-auto leading-relaxed">
            Create your account and start building amazing projects
          </p>
        </motion.div>

        {/* Auth Method Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-1 shadow-xl border border-slate-200/50 dark:border-slate-700/50"
        >
          <div className="flex bg-white dark:bg-slate-900/50 rounded-xl p-1">
            <button
              onClick={() => setMethod("email")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                method === "email"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setMethod("google")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                method === "google"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              }`}
            >
              Google
            </button>
          </div>
        </motion.div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {method === "email" ? (
            <motion.form
              key="email"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 space-y-6"
            >
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register("displayName")}
                    className={`w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 ${
                      errors.displayName
                        ? "ring-2 ring-red-500/20 border-red-500"
                        : ""
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.displayName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.displayName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 ${
                      errors.email
                        ? "ring-2 ring-red-500/20 border-red-500"
                        : ""
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-12 pr-12 py-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 ${
                      errors.password
                        ? "ring-2 ring-red-500/20 border-red-500"
                        : ""
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-slate-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.password.message}
                  </p>
                )}
                {password && password.length >= 6 && (
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span>Strong password</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full pl-12 pr-12 py-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 ${
                      errors.confirmPassword
                        ? "ring-2 ring-red-500/20 border-red-500"
                        : ""
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-slate-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm animate-pulse"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-xl shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="google"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleSignup}
                disabled={isSubmitting}
                className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/25 transition-all rounded-2xl px-6 py-6 flex items-center justify-center space-x-4 text-slate-700 dark:text-slate-300 font-semibold shadow-lg"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                ) : (
                  <>
                    <span className="w-6 h-6 text-red-500 flex-shrink-0 font-bold text-lg leading-none flex items-center justify-center">
                      G
                    </span>

                    <span>Sign up with Google</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center space-y-4 pt-8 border-t border-slate-200/50 dark:border-slate-700/50"
        >
          <Link
            to="/login"
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
          >
            <span>Already have an account?</span>
            <span className="ml-1 font-semibold">Sign in</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-500">
            <Link
              to="/"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
