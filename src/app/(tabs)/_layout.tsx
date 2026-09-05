import { Redirect, Href, Tabs } from "expo-router";

import BottomTab from "@/components/layout/BottomTab";

import { useAuth } from "@/hooks/useAuth";

export default function TabsLayout() {
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

  return (
    <Tabs
      tabBar={(props) => <BottomTab {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="categories" options={{ title: "Categories" }} />
      <Tabs.Screen name="cart" options={{ title: "Cart" }} />
      <Tabs.Screen name="wishlist" options={{ title: "Wishlist" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

