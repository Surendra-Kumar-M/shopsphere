import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";

import { fetchPaymentIntentClientSecret } from "@/services/payment/paymentService";

/**
 * Custom hook that wraps the Stripe Payment Sheet flow.
 *
 * Usage:
 *   const { pay, isLoading } = usePayment();
 *   await pay(subtotalInCurrency);   // e.g. 499.99
 */
export function usePayment() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isLoading, setIsLoading] = useState(false);

  const pay = useCallback(
    async (amountInCurrency: number): Promise<boolean> => {
      try {
        setIsLoading(true);

        // Convert to smallest unit (paise for INR, cents for USD)
        const amountInSmallestUnit = Math.round(amountInCurrency * 100);

        const secret = await fetchPaymentIntentClientSecret({
          amount: amountInSmallestUnit,
        });

        if (!secret) {
          Alert.alert("Payment Error", "Failed to initialise payment. Please try again.");
          return false;
        }

        const { error: initError } = await initPaymentSheet({
          merchantDisplayName: "ShopSphere",
          paymentIntentClientSecret: secret,
          googlePay: {
            merchantCountryCode: "IN",
            testEnv: true,
          },
        });

        if (initError) {
          Alert.alert("Payment Error", initError.message);
          return false;
        }

        const { error: presentError } = await presentPaymentSheet();

        if (presentError) {
          if (presentError.code !== "Canceled") {
            Alert.alert("Payment Failed", presentError.message);
          }
          return false;
        }

        Alert.alert("Success", "Payment completed successfully! 🎉");
        return true;
      } catch (err) {
        console.error("Payment error:", err);
        Alert.alert("Payment Error", "Something went wrong. Please try again.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [initPaymentSheet, presentPaymentSheet],
  );

  return { pay, isLoading };
}
