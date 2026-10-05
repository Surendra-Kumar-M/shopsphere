import { combineReducers } from "@reduxjs/toolkit";



import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import { api } from "@/services/api/api";

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,

  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
