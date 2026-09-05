import { PropsWithChildren, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

import { useAppDispatch } from "@/store/hooks";
import { setCredentials, setInitialized, setUser } from "@/store/slices/authSlice";
import { initializeAuthListener } from "@/services/auth/authListener";
import { authApi } from "@/services/api/endpoints/authApi";
import { clearTokens, getAccessToken } from "@/services/storage/secureStorage";

void SplashScreen.preventAutoHideAsync();

export default function AuthProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;
    let initialResolved = false;

    const unsubscribe = initializeAuthListener(async () => {
      if (initialResolved) return;
      initialResolved = true;

      if (mounted) {
        dispatch(setInitialized(true));
        await SplashScreen.hideAsync().catch(() => {});
      }
    });

    // Fallback if no Firebase auth state change completes after timeout
    const timeoutId = setTimeout(async () => {
      if (!initialResolved && mounted) {
        initialResolved = true;
        try {
          const accessToken = await getAccessToken();
          if (accessToken) {
            const result = await dispatch(
              authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }),
            );
            if ("data" in result && result.data) {
              dispatch(setCredentials({ user: result.data }));
            }
          }
        } catch {
          dispatch(setUser(null));
        } finally {
          dispatch(setInitialized(true));
          await SplashScreen.hideAsync().catch(() => {});
        }
      }
    }, 2000);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [dispatch]);

  return children;
}
