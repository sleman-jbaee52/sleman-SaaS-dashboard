import type { NavbarLink, SubscriptionPlan } from "../types/index.ts";

// src/utils/constants.ts

// Navigation Links
export const NAVBAR_LINKS: NavbarLink[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Auth Pages
export const AUTH_PAGES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
};

// Subscription Plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "starter",
    price: 0,
    priceId: "price_starter",
    features: [
      "5 Projects",
      "Basic Analytics",
      "Email Support",
      "Community Access",
    ],
    maxProjects: 5,
  },
  {
    id: "professional",
    name: "professional",
    price: 29,
    priceId: "price_professional_monthly",
    features: [
      "Unlimited Projects",
      "Advanced Analytics",
      "Priority Support",
      "API Access",
      "Custom Domains",
    ],
    maxProjects: 999,
  },
  {
    id: "enterprise",
    name: "enterprise",
    price: 99,
    priceId: "price_enterprise_monthly",
    features: [
      "Everything in Professional",
      "Team Collaboration",
      "White-label",
      "24/7 Support",
      "Custom Integrations",
    ],
    maxProjects: 9999,
  },
];

// Firebase Collections
export const FIREBASE_COLLECTIONS = {
  USERS: "users",
  PROJECTS: "projects",
};

// Local Storage Keys
export const LOCAL_STORAGE = {
  THEME: "saas-theme",
  USER_PROFILE: "saas-user-profile",
};

// Animation Durations
export const ANIMATIONS = {
  FAST: "200ms",
  NORMAL: "400ms",
  SLOW: "600ms",
};

// Breakpoints
export const BREAKPOINTS = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;
