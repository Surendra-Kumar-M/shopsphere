import React, { ReactElement } from "react";
import { StripeProvider as NativeStripeProvider } from "@stripe/stripe-react-native";

interface Props {
  children: ReactElement;
}

const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

export default function StripeProvider({ children }: Props) {
  return (
    <NativeStripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.com.shopsphere"
      urlScheme="shopsphere"
      threeDSecureParams={{
        backgroundColor: "#FFF",
        timeout: 5,
      }}
    >
      {children}
    </NativeStripeProvider>
  );
}
