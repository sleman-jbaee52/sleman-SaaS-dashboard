import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
      aria-label="Switch Theme"
    >
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </motion.button>
  );
};
export default ThemeSwitch;
