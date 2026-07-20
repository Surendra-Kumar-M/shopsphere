export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: "shopsphere_access_token",
  REFRESH_TOKEN: "shopsphere_refresh_token",
} as const;

export const AUTH_TOKEN_EXPIRY_MINS = 30;

export const ONBOARDING_SLIDES = [
  {
    id: "discover",
    title: "Discover Products",
    description:
      "Browse thousands of products across categories curated for you.",
  },
  {
    id: "shop",
    title: "Shop Smarter",
    description:
      "Save favorites, manage your cart, and checkout in just a few taps.",
  },
  {
    id: "track",
    title: "Track Orders",
    description:
      "Stay updated on deliveries and reorder your favorites anytime.",
  },
] as const;
