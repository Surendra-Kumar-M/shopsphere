import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ReduxProvider from "./ReduxProvider";
import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";
import StripeProvider from "./StripeProvider";

interface Props {
  children: React.ReactNode;
}

export default function AppProvider({ children }: Props) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ReduxProvider>
          <AuthProvider>
            <StripeProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </StripeProvider>
          </AuthProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

