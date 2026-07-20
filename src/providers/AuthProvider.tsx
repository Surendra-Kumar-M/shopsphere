import { PropsWithChildren, useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

import { useAppDispatch } from "@/store/hooks";
import { setCredentials, setInitialized, setUser } from "@/store/slices/authSlice";

import { authApi } from "@/services/api/endpoints/authApi";
import {
  clearTokens,
  getAccessToken,
} from "@/services/storage/secureStorage";

void SplashScreen.preventAutoHideAsync();

export default function AuthProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;

    async function bootstrapAuth() {
      try {
        const accessToken = await getAccessToken();

        if (!accessToken) {
          return;
        }

        const result = await dispatch(authApi.endpoints.getMe.initiate(undefined, {
          forceRefetch: true,
        }));

        if (!mounted) return;

        if ("data" in result && result.data) {
          dispatch(setCredentials({ user: result.data }));
          return;
        }

        await clearTokens();
        dispatch(setUser(null));
      } finally {
        if (mounted) {
          dispatch(setInitialized(true));
          await SplashScreen.hideAsync();
        }
      }
    }

    bootstrapAuth();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return children;
}
