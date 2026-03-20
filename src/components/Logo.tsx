// src/components/Logo.tsx
import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  // تحديد حجم الخط بناءً على الـ prop
  const textSize =
    size === "sm" ? "text-xl" : size === "lg" ? "text-3xl" : "text-2xl";
  const iconSize = size === "sm" ? 24 : size === "lg" ? 40 : 32;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-2 font-bold tracking-tight ${textSize} ${className}`}
    >
      {/* أيقونة S مدمجة */}
      <div className="relative flex items-center justify-center bg-indigo-600 text-white rounded-lg overflow-hidden shadow-lg shadow-indigo-500/30">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-20"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="relative z-10 text-lg">S</span>
      </div>

      {/* النص */}
      <span className="text-slate-900 dark:text-white">
        Sleman<span className="text-indigo-600">.</span>
      </span>
    </motion.div>
  );
};

export default Logo;
