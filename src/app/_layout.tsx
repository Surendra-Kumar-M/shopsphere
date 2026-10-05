import AppProvider from "@/providers/AppProvider";
import { Stack } from "expo-router";



export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProvider>
  );
}
