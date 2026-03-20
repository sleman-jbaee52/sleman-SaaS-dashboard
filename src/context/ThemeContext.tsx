// // src/context/ThemeContext.tsx
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { Theme, ThemeContextType } from "../types";
// import { LOCAL_STORAGE } from "../utils/constants";

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// interface ThemeProviderProps {
//   children: ReactNode;
// }

// export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>("light");

//   // Load theme from localStorage on mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem(LOCAL_STORAGE.THEME) as Theme;
//     if (savedTheme) {
//       setTheme(savedTheme);
//     } else {
//       // Default to system preference
//       const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
//         .matches
//         ? "dark"
//         : "light";
//       setTheme(systemTheme);
//     }
//   }, []);

//   // Apply theme to document
//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }

//     // Save to localStorage
//     localStorage.setItem(LOCAL_STORAGE.THEME, theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   const value: ThemeContextType = {
//     theme,
//     toggleTheme,
//   };

//   return (
//     <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
//   );
// };

// // Custom hook to use ThemeContext
// export const useTheme = (): ThemeContextType => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// };
