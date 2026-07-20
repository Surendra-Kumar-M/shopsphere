import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

import { CartItem, CartState } from "@/models/Cart";
import { Product } from "@/models/Product";

import { getDiscountedPrice } from "@/utils/product.utils";

import { normalizeCartState } from "@/store/persistMigration";

const initialState: CartState = {
  items: [],
};

interface RehydrateAction {
  type: typeof REHYDRATE;
  payload?: {
    cart?: Partial<CartState>;
  };
}

const ensureItems = (state: CartState) => {
  if (!Array.isArray(state.items)) {
    state.items = [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      ensureItems(state);

      const existing = state.items.find(
        (item) => item.product.id === action.payload.id,
      );

      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.items.push({ product: action.payload, quantity: 1 });
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      ensureItems(state);

      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      ensureItems(state);

      const item = state.items.find(
        (cartItem) => cartItem.product.id === action.payload.productId,
      );

      if (!item) return;

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => cartItem.product.id !== action.payload.productId,
        );
        return;
      }

      item.quantity = action.payload.quantity;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: RehydrateAction) => {
      return normalizeCartState(action.payload?.cart ?? state);
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: { cart?: CartState }) =>
  state.cart?.items ?? [];

export const selectCartCount = (state: { cart?: CartState }) =>
  selectCartItems(state).reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: { cart?: CartState }) =>
  selectCartItems(state).reduce((total, item) => {
    const unitPrice = getDiscountedPrice(
      item.product.price,
      item.product.discountPercentage,
    );

    return total + unitPrice * item.quantity;
  }, 0);

export const getCartItemTotal = (item: CartItem): number => {
  const unitPrice = getDiscountedPrice(
    item.product.price,
    item.product.discountPercentage,
  );

  return unitPrice * item.quantity;
};

export const selectIsInCart =
  (productId: number) =>
  (state: { cart?: CartState }): boolean =>
    selectCartItems(state).some((item) => item.product.id === productId);

export default cartSlice.reducer;

export type { CartItem };
