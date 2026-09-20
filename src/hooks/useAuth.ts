import { useCallback, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectIsAuthenticated,
  selectIsAuthInitialized,
  selectIsOnboarded,
  selectUser,
  setCredentials,
  setInitialized,
  setOnboarded,
} from "@/store/slices/authSlice";

import { api } from "@/services/api/api";
import {
  loginWithEmail,
  registerWithEmail,
  resetPassword as resetPasswordService,
  getFirebaseErrorMessage,
} from "@/services/auth/authService";
import { signInWithGoogle } from "@/services/auth/googleAuth";
import { logoutUser } from "@/services/auth/logout";
import { mapFirebaseUser } from "@/services/firebase/mapFirebaseUser";

interface LoginParams {
  username: string; // Accepts email or username
  password: string;
}

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export function useAuth() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isOnboarded = useAppSelector(selectIsOnboarded);
  const isInitialized = useAppSelector(selectIsAuthInitialized);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const displayName = useMemo(() => {
    if (!user) return "";
    return user.name || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.username || "";
  }, [user]);

  const handleLogin = useCallback(
    async ({ username, password }: LoginParams) => {
      setIsLoggingIn(true);
      setAuthError(null);

      try {
        // Firebase Auth login requires email address
        const firebaseUser = await loginWithEmail(username, password);
        const mappedUser = mapFirebaseUser(firebaseUser);

        dispatch(
          setCredentials({
            user: mappedUser,
            isAuthenticated: true,
          }),
        );
        return mappedUser;
      } catch (err: unknown) {
        const errorMsg = getFirebaseErrorMessage(err);
        setAuthError(errorMsg);
        throw new Error(errorMsg);
      } finally {
        setIsLoggingIn(false);
      }
    },
    [dispatch],
  );

  const googleSignIn = useCallback(
    async () => {
      setIsLoggingIn(true);
      setAuthError(null);

      try {
        const firebaseUser = await signInWithGoogle();
        const mappedUser = mapFirebaseUser(firebaseUser);

        dispatch(
          setCredentials({
            user: mappedUser,
            isAuthenticated: true,
          }),
        );
        return mappedUser;
      } catch (err: unknown) {
        const errorMsg = getFirebaseErrorMessage(err);
        setAuthError(errorMsg);
        throw new Error(errorMsg);
      } finally {
        setIsLoggingIn(false);
      }
    },
    [dispatch],
  );

  const handleRegister = useCallback(
    async (params: RegisterParams) => {
      setIsRegistering(true);
      setAuthError(null);

      try {
        const fullName = `${params.firstName} ${params.lastName}`.trim();
        const firebaseUser = await registerWithEmail(
          params.email,
          params.password,
          fullName,
        );

        const mappedUser = mapFirebaseUser(firebaseUser);
        mappedUser.username = params.username;
        mappedUser.firstName = params.firstName;
        mappedUser.lastName = params.lastName;

        dispatch(
          setCredentials({
            user: mappedUser,
            isAuthenticated: true,
          }),
        );
        return mappedUser;
      } catch (err: unknown) {
        const errorMsg = getFirebaseErrorMessage(err);
        setAuthError(errorMsg);
        throw new Error(errorMsg);
      } finally {
        setIsRegistering(false);
      }
    },
    [dispatch],
  );

  const handleForgotPassword = useCallback(async (email: string) => {
    setAuthError(null);
    try {
      await resetPasswordService(email);
    } catch (err: unknown) {
      const errorMsg = getFirebaseErrorMessage(err);
      setAuthError(errorMsg);
      throw new Error(errorMsg);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await logoutUser();
    dispatch(api.util.resetApiState());
  }, [dispatch]);

  const completeOnboarding = useCallback(() => {
    dispatch(setOnboarded(true));
  }, [dispatch]);

  const markInitialized = useCallback(
    (value: boolean) => {
      dispatch(setInitialized(value));
    },
    [dispatch],
  );

  return {
    user,
    displayName,
    isAuthenticated,
    isOnboarded,
    isInitialized,
    isLoggingIn,
    isRegistering,
    authError,
    login: handleLogin,
    register: handleRegister,
    forgotPassword: handleForgotPassword,
    googleSignIn,
    logout: handleLogout,
    completeOnboarding,
    markInitialized,
  };
}
