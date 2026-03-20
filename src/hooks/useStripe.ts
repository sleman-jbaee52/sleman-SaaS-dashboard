import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { SUBSCRIPTION_PLANS } from "../utils/constants";
import { UserProfile, SubscriptionPlan } from "../types";
import { updateUserSubscription } from "../services/firebase";

// Load stripe instance
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
);

interface StripeHookReturn {
  clientSecret: string | null;
  loading: boolean;
  error: string | null;
  createCheckoutSession: (
    planId: "starter" | "professional" | "enterprise",
    user: UserProfile,
  ) => Promise<void>;
  handleSubscriptionSuccess: (sessionId: string) => Promise<void>;
}

// Stripe redirect type
interface StripeRedirect {
  redirectToCheckout: (options: { sessionId: string }) => Promise<void>;
}

export const useStripe = (): StripeHookReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const createCheckoutSession = useCallback(
    async (
      planId: "starter" | "professional" | "enterprise",
      user: UserProfile,
    ) => {
      setLoading(true);
      setError(null);

      try {
        const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
        if (!plan) throw new Error("Invalid plan");

        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planId: plan.priceId,
            userId: user.uid,
            email: user.email,
          }),
        });

        const { client_secret, sessionId } = await response.json();

        if (!client_secret) {
          throw new Error("Failed to create checkout session");
        }

        setClientSecret(client_secret);

        const stripe = (await stripePromise) as StripeRedirect | null;
        if (!stripe || typeof stripe.redirectToCheckout !== "function") {
          throw new Error("Stripe redirectToCheckout not available");
        }

        await stripe.redirectToCheckout({ sessionId: sessionId! });
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        console.error("Checkout Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSubscriptionSuccess = useCallback(async (sessionId: string) => {
    try {
      const response = await fetch("/api/verify-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const result = await response.json();
      const plan = result.plan as SubscriptionPlan;
      const userId = result.userId as string;

      // Convert plan name to subscription type
      const planName: "starter" | "professional" | "enterprise" =
        (plan.name as "starter" | "professional" | "enterprise") || "starter";

      if (planName && userId) {
        await updateUserSubscription(userId, planName);
      }
    } catch (error: unknown) {
      console.error("Subscription verification failed:", error);
    }
  }, []);

  return {
    clientSecret,
    loading,
    error,
    createCheckoutSession,
    handleSubscriptionSuccess,
  };
};
