import React, { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Logo from "./Logo";
// import { useTheme } from "next-themes";
import ThemeSwitch from "./ThemeSwitch";

import {
  User,
  LogOut,
  // Moon,
  // Sun,
  Menu,
  X,
  LogIn,
  UserPlus,
} from "lucide-react";
import { NAVBAR_LINKS } from "../utils/constants";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollPositionRef = useRef<number>(0);

  const { user, logout } = useAuth();
  // const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    if (isMobileMenuOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollPositionRef.current}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollPositionRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isMobileMenuOpen]);

  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = "/#features";
    handleOverlayClick();
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = "/";
    handleOverlayClick();
  };

  const handleLogout = async () => {
    await logout();
    handleOverlayClick();
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 shadow-lg backdrop-blur-md dark:bg-slate-900/80"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/">
              <Logo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {NAVBAR_LINKS.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {link.label === "Features" ? (
                  <a
                    href={link.href}
                    onClick={handleFeaturesClick}
                    className={`relative font-medium transition-colors ${
                      location.pathname === "/" && location.hash === "#features"
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full" />
                  </a>
                ) : link.label === "Home" ? (
                  <a
                    href={link.href}
                    onClick={handleHomeClick}
                    className={`relative font-medium transition-colors ${
                      location.pathname === "/"
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full" />
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`relative font-medium transition-colors ${
                      location.pathname === link.href
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden items-center space-x-2 md:flex">
            {/* Theme Toggle */}
            <ThemeSwitch />

            {/* Auth/User Section */}
            {user ? (
              <>
                <motion.div
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 rounded-lg px-3 py-2 font-medium text-slate-700 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden max-w-37.5 truncate sm:inline">
                      {user.displayName?.split(" ")[0] ||
                        user.email?.split("@")[0] ||
                        "User"}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute top-full right-0 z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-2 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
                      >
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <motion.button
                          onClick={handleLogout}
                          className="flex w-full items-center space-x-3 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 font-medium text-slate-700 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeSwitch />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-indigo-600 dark:text-slate-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Enhanced with auth */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleOverlayClick}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-80 border-l border-slate-200 bg-white shadow-2xl md:hidden dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex h-full flex-col p-6">
                <div className="mb-8 flex items-center justify-between">
                  <Link to="/" onClick={handleOverlayClick}>
                    <Logo size="sm" />
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleOverlayClick}
                    className="p-2 text-slate-700 dark:text-slate-300"
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>

                <div className="mb-8 flex flex-1 flex-col space-y-6">
                  {NAVBAR_LINKS.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.label === "Features" ? (
                        <a
                          href={link.href}
                          onClick={handleFeaturesClick}
                          className="block py-3 text-xl font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-300"
                        >
                          {link.label}
                        </a>
                      ) : link.label === "Home" ? (
                        <a
                          href={link.href}
                          onClick={handleHomeClick}
                          className="block py-3 text-xl font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-300"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={handleOverlayClick}
                          className="block py-3 text-xl font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-300"
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Auth Section */}
                <div className="flex-shrink-0 border-t border-slate-200 pt-6 dark:border-slate-700">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="truncate font-medium text-slate-900 dark:text-white">
                            {user.displayName?.split(" ")[0] ||
                              user.email?.split("@")[0] ||
                              "User"}
                          </p>
                          <p className="text-sm text-slate-500">
                            {user.subscriptionPlan.toUpperCase()} Plan
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                        onClick={handleOverlayClick}
                      >
                        <User className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                      <motion.button
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/login"
                        className="flex w-full items-center justify-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                        onClick={handleOverlayClick}
                      >
                        <LogIn className="mr-2 h-5 w-5" />
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white shadow-lg hover:bg-indigo-700"
                        onClick={handleOverlayClick}
                      >
                        <UserPlus className="mr-2 h-5 w-5" />
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
