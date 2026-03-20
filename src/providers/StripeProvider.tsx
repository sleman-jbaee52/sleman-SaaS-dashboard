// src/providers/StripeProvider.tsx

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../services/stripe";

interface Props {
  children: React.ReactNode;
  options?: any;
}

export const StripeProvider: React.FC<Props> = ({ children, options }) => {
  if (!stripePromise) {
    return <>{children}</>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
