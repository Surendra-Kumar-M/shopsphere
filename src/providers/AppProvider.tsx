import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ReduxProvider from "./ReduxProvider";
import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";

interface Props {
  children: React.ReactNode;
}

export default function AppProvider({ children }: Props) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ReduxProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
