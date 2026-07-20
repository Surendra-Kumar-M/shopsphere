import { ReactNode } from "react";
import { Redirect, Href } from "expo-router";

import { useAuth } from "@/hooks/useAuth";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
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

  return children;
}
