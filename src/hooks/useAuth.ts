import { useCallback, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logout as logoutAction,
  selectAuth,
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
  useLoginMutation,
  useRegisterMutation,
} from "@/services/api/endpoints/authApi";
import {
  clearTokens,
  setTokens,
} from "@/services/storage/secureStorage";

interface LoginParams {
  username: string;
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

  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isOnboarded = useAppSelector(selectIsOnboarded);
  const isInitialized = useAppSelector(selectIsAuthInitialized);

  const [loginMutation, loginState] = useLoginMutation();
  const [registerMutation, registerState] = useRegisterMutation();

  const displayName = useMemo(() => {
    if (!user) return "";

    return `${user.firstName} ${user.lastName}`.trim() || user.username;
  }, [user]);

  const handleLogin = useCallback(
    async ({ username, password }: LoginParams) => {
      const result = await loginMutation({ username, password }).unwrap();

      await setTokens(result.tokens);
      dispatch(setCredentials({ user: result.user }));

      return result.user;
    },
    [dispatch, loginMutation],
  );

  const handleRegister = useCallback(
    async (params: RegisterParams) => {
      await registerMutation(params).unwrap();

      return handleLogin({
        username: params.username,
        password: params.password,
      });
    },
    [handleLogin, registerMutation],
  );

  const handleLogout = useCallback(async () => {
    await clearTokens();
    dispatch(logoutAction());
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
    isLoggingIn: loginState.isLoading,
    isRegistering: registerState.isLoading,
    loginError: loginState.error,
    registerError: registerState.error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    completeOnboarding,
    markInitialized,
  };
}
