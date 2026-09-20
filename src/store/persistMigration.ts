import { PersistedState } from "redux-persist";

import { CartState } from "@/models/Cart";
import { AuthState } from "@/models/User";
import { WishlistState } from "@/models/Wishlist";


interface PersistedRootState {
  cart?: Partial<CartState>;
  wishlist?: Partial<WishlistState>;
  auth?: Partial<AuthState>;
  [key: string]: unknown;
}

export const PERSIST_VERSION = 3;

export function normalizeCartState(cart: Partial<CartState> | undefined): CartState {
  const items = Array.isArray(cart?.items) ? cart.items : [];
  return {
    items: items
      .map((item: any) => ({
        productId: item.productId ?? item.product?.id,
        quantity: item.quantity ?? 1,
      }))
      .filter((item: any) => item.productId != null),
  };
}

export function normalizeWishlistState(
  wishlist: Partial<WishlistState> | undefined,
): WishlistState {
  const items = Array.isArray(wishlist?.items) ? wishlist.items : [];
  return {
    items: items
      .map((item: any) => ({
        productId: item.productId ?? item.id ?? item.product?.id,
      }))
      .filter((item: any) => item.productId != null),
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
    isLoading: false,
    error: null,
  };
}

export async function migratePersistedState(
  state: unknown,
): Promise<PersistedState> {
  if (!state || typeof state !== "object") {
    // null/undefined satisfies the `undefined` branch of PersistedState
    return state as PersistedState;
  }

  const persisted = state as PersistedRootState;

  return {
    ...persisted,
    cart: normalizeCartState(persisted.cart),
    wishlist: normalizeWishlistState(persisted.wishlist),
    auth: normalizeAuthState(persisted.auth),
  } as unknown as PersistedState;
}
