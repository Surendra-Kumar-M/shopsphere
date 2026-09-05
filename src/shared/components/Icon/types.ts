import { LucideIcon } from "lucide-react-native";
import { AppTheme } from "@/theme";

export type ThemeColor = keyof AppTheme["colors"];

export interface IconProps {
  icon: LucideIcon;

  size?: number;

  color?: ThemeColor;

  strokeWidth?: number;
}

