import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

import { AuthState, User } from "@/models/User";

import { normalizeAuthState } from "@/store/persistMigration";

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isOnboarded: false,
  isInitialized: false,
};

interface RehydrateAction {
  type: typeof REHYDRATE;
  payload?: {
    auth?: Partial<AuthState>;
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; isAuthenticated?: boolean }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated ?? true;
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    setOnboarded: (state, action: PayloadAction<boolean>) => {
      state.isOnboarded = action.payload;
    },

    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: RehydrateAction) => {
      return normalizeAuthState(action.payload?.auth ?? state);
    });
  },
});

export const {
  setCredentials,
  setUser,
  setOnboarded,
  setInitialized,
  logout,
} = authSlice.actions;

export const selectAuth = (state: { auth?: AuthState }) =>
  state.auth ?? initialAuthState;

export const selectUser = (state: { auth?: AuthState }) =>
  selectAuth(state).user;

export const selectIsAuthenticated = (state: { auth?: AuthState }) =>
  selectAuth(state).isAuthenticated;

export const selectIsOnboarded = (state: { auth?: AuthState }) =>
  selectAuth(state).isOnboarded;

export const selectIsAuthInitialized = (state: { auth?: AuthState }) =>
  selectAuth(state).isInitialized;

export default authSlice.reducer;
