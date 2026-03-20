// src/App.tsx
import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import { ThemeProvider } from "./context/ThemeContext";
import { StripeProvider } from "./providers/StripeProvider";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import { useAuth } from "./hooks/useAuth";
// import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
/**
 * Protected Route Component
 * Redirects unauthenticated users to login
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

/**
 * Public Route with Auth Redirect
 * Redirects authenticated users to dashboard
 */
const PublicRoute: React.FC<{
  children: React.ReactNode;
  redirectTo?: string;
}> = ({ children, redirectTo = "/dashboard" }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return user ? <Navigate to={redirectTo} replace /> : <>{children}</>;
};

/**
 * Main Application Content
 */
function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex min-h-screen flex-col">
        {/* Global Navbar */}
        <Navbar />

        {/* Stripe Provider for payment pages */}
        <StripeProvider>
          {/* Main Content */}
          <main className="grow">
            <Routes>
              {/* Public Landing Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/pricing" element={<PricingPage />} />

              {/* Auth Pages */}
              <Route
                path="/login"
                element={
                  <PublicRoute redirectTo="/dashboard">
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute redirectTo="/dashboard">
                    <SignupPage />
                  </PublicRoute>
                }
              />

              {/* Protected Dashboard */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* AnalyticsPage */}
              <Route path="/analytics" element={<AnalyticsPage />} />

              {/* AcoountSettingsPage   */}
              <Route
                path="/account-settings"
                element={<AccountSettingsPage />}
              />

              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-4 dark:from-slate-900 dark:to-slate-800">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mx-auto max-w-md text-center"
                    >
                      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-100 shadow-xl dark:bg-slate-800">
                        <span className="text-4xl">404</span>
                      </div>
                      <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                        Page Not Found
                      </h1>
                      <p className="mb-8 text-slate-600 dark:text-slate-400">
                        The page you're looking for doesn't exist.
                      </p>
                      <Link
                        to="/"
                        className="inline-flex items-center rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl"
                      >
                        ← Back to Home
                      </Link>
                    </motion.div>
                  </div>
                }
              />
            </Routes>
          </main>
        </StripeProvider>

        {/* Global Footer */}
        <Footer />
      </div>
    </div>
  );
}

/**
 * Root App Component with All Providers
 * Order matters: Theme > Auth > Stripe
 */
function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
