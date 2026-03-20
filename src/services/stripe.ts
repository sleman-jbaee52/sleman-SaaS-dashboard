// src/services/stripe.ts
import { loadStripe } from "@stripe/stripe-js";
import { SubscriptionPlan } from "../types";
import { SUBSCRIPTION_PLANS } from "../utils/constants";

/**
 * Stripe Service
 * Handles all Stripe-related operations
 */

// Your Stripe Publishable Key (add to .env)
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as
  | string
  | undefined;

export const stripePromise = STRIPE_PUBLISHABLE_KEY
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

/**
 * Get plan by ID
 */
export const getPlanById = (planId: string): SubscriptionPlan | null => {
  return SUBSCRIPTION_PLANS.find((plan) => plan.id === planId) || null;
};

/**
 * Format price for display
 */
export const formatPrice = (price: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Get plan features as HTML list
 */
export const getPlanFeatures = (planId: string): string[] => {
  const plan = getPlanById(planId);
  return plan?.features || [];
};

/**
 * Check if user can create project based on plan
 */
export const canCreateProject = (
  currentPlan: "starter" | "professional" | "enterprise",
  currentProjects: number,
): boolean => {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === currentPlan);
  return currentProjects < (plan?.maxProjects || 0);
};

/**
 * Get upgrade recommendation
 */
export const getRecommendedPlan = (
  currentProjects: number,
): "professional" | "enterprise" => {
  if (currentProjects >= 50) return "enterprise";
  return "professional";
};

/**
 * Stripe Checkout Options
 */
export const stripeCheckoutOptions = {
  mode: "subscription" as const,
  successUrl: `${window.location.origin}/dashboard?success=true`,
  cancelUrl: `${window.location.origin}/pricing?cancelled=true`,
};

/**
 * Webhook verification helper (client-side)
 */

export const verifyWebhookSignature = async (): Promise<boolean> => {
  // This should be done server-side in production
  // Client-side verification for demo purposes only
  console.warn("Webhook verification should be server-side in production");
  return true;
};

export default stripePromise;
