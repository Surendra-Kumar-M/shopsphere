import { combineReducers } from "@reduxjs/toolkit";

import { api } from "./api/api";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,

  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
