import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

import { Product } from "@/models/Product";
import { WishlistState } from "@/models/Wishlist";

import { normalizeWishlistState } from "@/store/persistMigration";

const initialState: WishlistState = {
  items: [],
};

interface RehydrateAction {
  type: typeof REHYDRATE;
  payload?: {
    wishlist?: Partial<WishlistState>;
  };
}

const ensureItems = (state: WishlistState) => {
  if (!Array.isArray(state.items)) {
    state.items = [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      ensureItems(state);

      const exists = state.items.some(
        (item) => item.productId === action.payload.id,
      );

      if (!exists) {
        state.items.push({ productId: action.payload.id });
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      ensureItems(state);

      state.items = state.items.filter((item) => item.productId !== action.payload);
    },

    toggleWishlist: (state, action: PayloadAction<Product>) => {
      ensureItems(state);

      const index = state.items.findIndex(
        (item) => item.productId === action.payload.id,
      );

      if (index >= 0) {
        state.items.splice(index, 1);
        return;
      }

      state.items.push({ productId: action.payload.id });
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: RehydrateAction) => {
      return normalizeWishlistState(action.payload?.wishlist ?? state);
    });
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export const selectWishlistItems = (state: { wishlist?: WishlistState }) =>
  state.wishlist?.items ?? [];

export const selectWishlistIds = (state: { wishlist?: WishlistState }) =>
  selectWishlistItems(state).map((item) => item.productId);

export const selectIsWishlisted =
  (productId: number) =>
  (state: { wishlist?: WishlistState }): boolean =>
    selectWishlistItems(state).some((item) => item.productId === productId);

export default wishlistSlice.reducer;
