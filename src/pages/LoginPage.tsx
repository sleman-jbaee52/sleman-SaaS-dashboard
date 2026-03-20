// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
// import { useTheme } from "../context/ThemeContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

import Logo from "../components/Logo";
// import { AUTH_PAGES } from "../utils/constansts"; // not used

// Form validation schema
const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [method, setMethod] = useState<"email" | "google">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();

  const { loginWithGoogle, loginWithEmail, loading, isAuthenticated, error } =
    useAuth();
  // const { theme } = useTheme(); // not used
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
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await loginWithEmail(data.email, data.password);
      // Wait brief moment for auth state to update
      setTimeout(() => {
        if (isAuthenticated) {
          const redirectTo = searchParams.get("redirectTo") || "/dashboard";
          navigate(redirectTo);
        }
      }, 500);
    } catch (error: unknown) {
      console.error("Login error:", error);
      // Error handled in context - no navigation
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/20 px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto w-20 h-20 bg-indigo-600/10 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
            <Logo size="lg" className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-4">
            Welcome Back
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-sm mx-auto leading-relaxed">
            Sign in to your account to continue to your dashboard
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
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setMethod("google")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                method === "google"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
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
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 ${
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

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-12 pr-12 py-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 ${
                      errors.password
                        ? "ring-2 ring-red-500/20 border-red-500"
                        : ""
                    }`}
                    placeholder="Enter your password"
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
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
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
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/25 transition-all rounded-2xl px-6 py-6 flex items-center justify-center space-x-4 text-slate-700 dark:text-slate-300 font-semibold shadow-lg"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                ) : (
                  <>
                    <span className="w-6 h-6 text-red-500 flex-shrink-0 font-bold text-lg leading-none flex items-center justify-center">
                      G
                    </span>

                    <span>Continue with Google</span>
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
            to="/signup"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
          >
            <span>Don't have an account?</span>
            <span className="ml-1 font-semibold">Sign up</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-500">
            <Link
              to="/"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
