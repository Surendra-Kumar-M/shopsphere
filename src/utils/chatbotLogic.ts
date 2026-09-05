/**
 * Simple FAQ chatbot response logic for ShopSphere.
 * Maps common user queries to pre-built responses.
 */
export const getBotReply = (message: string): string => {
  const text = message.toLowerCase();

  // Greetings
  if (text.includes("hello") || text.includes("hi")) {
    return "Hi 👋 I'm your ShopSphere assistant. How can I help you today?";
  }

  // Orders
  if (text.includes("order") || text.includes("track")) {
    return "You can track your order from the Orders section in your Profile tab.";
  }

  // Returns & Refunds
  if (text.includes("return") || text.includes("refund")) {
    return "Returns are allowed within 30 days of delivery. Refunds are processed within 5–7 business days.";
  }

  // Store locations
  if (text.includes("store") || text.includes("location")) {
    return "ShopSphere is an online-first store. Visit our website for the full catalogue!";
  }

  // Payment issues
  if (
    text.includes("payment") ||
    text.includes("payment issue") ||
    text.includes("failed payment") ||
    text.includes("payment failed")
  ) {
    return (
      "💳 Payment issue? Don't worry!\n\n" +
      "Please check the following:\n" +
      "• Stable internet connection\n" +
      "• Sufficient balance\n" +
      "• Correct card / UPI details\n" +
      "• Try a different payment method\n\n" +
      "👉 If money was debited but order not placed, it will be auto-refunded within 3–5 business days.\n\n" +
      "If the issue continues, you can chat with a real support agent 😊"
    );
  }

  // Contact support
  if (text.includes("contact") || text.includes("support")) {
    return "You can reach us at support@shopsphere.com or chat with a live agent.";
  }

  // Escalation to human
  if (
    text.includes("agent") ||
    text.includes("human") ||
    text.includes("real person")
  ) {
    return "👩‍💼 Connecting you to a support agent. Please wait...";
  }

  // Default fallback
  return "Sorry 😕 I didn't understand that. You can ask about orders, payments, returns, or store locations.";
};
