import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";


import { rootReducer } from "./rootReducer";
import { api } from "@/services/api/api";
import "@/services/api/endpoints/authApi";
import {
  migratePersistedState,
  PERSIST_VERSION,
} from "./persistMigration";

const persistConfig = {
  key: "root",
  version: PERSIST_VERSION,
  storage: AsyncStorage,
  whitelist: ["auth", "cart", "wishlist"],
  migrate: migratePersistedState,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
