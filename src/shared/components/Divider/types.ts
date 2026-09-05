import { AppTheme } from "@/theme";
import { ViewProps } from "react-native";

type ThemeColor = keyof AppTheme["colors"];

export interface DividerProps extends ViewProps {
  orientation?: "horizontal" | "vertical";
  thickness?: number;
  spacing?: number;
  color?: ThemeColor;
}
