import { Redirect, Href } from "expo-router";

import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { isAuthenticated, isOnboarded, isInitialized } = useAuth();

  if (!isInitialized) {
    return null;
  }

  if (!isOnboarded) {
    return <Redirect href={"/onboarding" as Href} />;
  }

  if (!isAuthenticated) {
    return <Redirect href={"/login" as Href} />;
  }

  return <Redirect href={"/(tabs)" as Href} />;
}
