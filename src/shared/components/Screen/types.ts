import { ReactNode } from "react";
import { ScrollViewProps, StyleProp, ViewStyle } from "react-native";

import { AppTheme } from "@/theme";

export type ThemeColor = keyof AppTheme["colors"];

export interface ScreenProps extends Omit<ScrollViewProps, "children"> {
  children?: ReactNode;

  scrollable?: boolean;

  safeArea?: boolean;

  padding?: boolean;

  keyboardAvoiding?: boolean;

  backgroundColor?: ThemeColor;

  contentContainerStyle?: StyleProp<ViewStyle>;

  refreshing?: boolean;

  onRefresh?: () => void;
}
