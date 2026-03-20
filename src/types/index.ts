// src/types/index.ts

import { Timestamp } from "firebase/firestore";

// Auth Types

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  subscriptionPlan: "starter" | "professional" | "enterprise";
  projectsCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// Theme Types
export type Theme = "light" | "dark";
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Stripe Types
export interface SubscriptionPlan {
  id: string;
  name: "starter" | "professional" | "enterprise";
  price: number;
  priceId: string;
  features: string[];
  maxProjects: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: import("firebase/firestore").Timestamp;
}

// UI Types
export interface NavbarLink {
  label: string;
  href: string;
  authRequired?: boolean;
}

export interface PageProps {
  className?: string;
}
