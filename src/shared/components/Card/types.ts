import { PressableProps, StyleProp, ViewStyle } from "react-native";

import { AppTheme } from "@/theme";

export type CardVariant = "filled" | "outlined" | "elevated";

export interface CardProps extends Omit<PressableProps, "children" | "style"> {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;

  variant?: CardVariant;

  padding?: boolean;
}

type ThemeColor = keyof AppTheme["colors"];

export const CARD_VARIANTS = {
  filled: {
    background: "surface",
    border: "transparent",
    shadow: true,
  },

  outlined: {
    background: "surface",
    border: "border",
    shadow: false,
  },

  elevated: {
    background: "surface",
    border: "transparent",
    shadow: true,
  },
} satisfies Record<
  string,
  {
    background: ThemeColor;
    border: ThemeColor;
    shadow: boolean;
  }
>;