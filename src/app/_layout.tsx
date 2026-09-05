import { Stack } from "expo-router";



import AppProvider from "@/providers/AppProvider";



export default function RootLayout() {

  return (

    <AppProvider>

      <Stack screenOptions={{ headerShown: false }}>

        <Stack.Screen name="index" />

        <Stack.Screen name="(auth)" />

        <Stack.Screen name="(tabs)" />

        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="category/[slug]" />

        <Stack.Screen
          name="scanner"
          options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Screen name="scan-result" />

      </Stack>

    </AppProvider>

  );

}

