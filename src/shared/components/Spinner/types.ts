import { AppTheme } from "@/theme";

export type SpinnerSize = "sm" | "md" | "lg";

export type ThemeColor = keyof AppTheme["colors"];

export interface SpinnerProps {
  size?: SpinnerSize;

  color?: ThemeColor;
}


export const SPINNER_SIZES = {
  sm: 16,

  md: 24,

  lg: 36,
} satisfies Record<SpinnerSize, number>;