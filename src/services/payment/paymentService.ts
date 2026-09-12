const STRIPE_BACKEND_URL =
  process.env.EXPO_PUBLIC_STRIPE_BACKEND_URL ?? "";

interface PaymentIntentParams {
  amount: number; // in smallest currency unit (e.g. paise for INR)
  currency?: string;
  gateway?: string;
}

/**
 * Calls the backend to create a Stripe PaymentIntent and returns
 * the client_secret needed to initialise the Payment Sheet.
 */
export async function fetchPaymentIntentClientSecret({
  amount,
  currency = "inr",
  gateway = "card",
}: PaymentIntentParams): Promise<string | null> {
  try {
    const res = await fetch(STRIPE_BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency, gateway }),
    });

    const data = await res.json();
    return data.client_secret ?? null;
  } catch (error) {
    console.error("Payment intent error:", error);
    return null;
  }
}
