import { CartState } from "@/models/Cart";
import { AuthState } from "@/models/User";
import { WishlistState } from "@/models/Wishlist";

import { initialAuthState } from "@/store/slices/authSlice";

interface PersistedRootState {
  cart?: Partial<CartState>;
  wishlist?: Partial<WishlistState>;
  auth?: Partial<AuthState>;
  [key: string]: unknown;
}

export const PERSIST_VERSION = 2;

export function normalizeCartState(cart: Partial<CartState> | undefined): CartState {
  return {
    items: Array.isArray(cart?.items) ? cart.items : [],
  };
}

export function normalizeWishlistState(
  wishlist: Partial<WishlistState> | undefined,
): WishlistState {
  return {
    items: Array.isArray(wishlist?.items) ? wishlist.items : [],
  };
}

export function normalizeAuthState(
  auth: Partial<AuthState> | undefined,
): AuthState {
  return {
    user: auth?.user ?? null,
    isAuthenticated: Boolean(auth?.isAuthenticated),
    isOnboarded: Boolean(auth?.isOnboarded),
    isInitialized: false,
  };
}

export async function migratePersistedState(
  state: unknown,
): Promise<unknown> {
  if (!state || typeof state !== "object") {
    return state;
  }

  const persisted = state as PersistedRootState;

  return {
    ...persisted,
    cart: normalizeCartState(persisted.cart),
    wishlist: normalizeWishlistState(persisted.wishlist),
    auth: normalizeAuthState(persisted.auth),
  };
}
