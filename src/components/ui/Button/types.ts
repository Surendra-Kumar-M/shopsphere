import { PressableProps } from "react-native";

import { LucideIcon } from "lucide-react-native";

import { AppTheme } from "@/theme";

export type ThemeColor = keyof AppTheme["colors"];

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  title?: string;

  icon?: LucideIcon;

  leftIcon?: LucideIcon;

  rightIcon?: LucideIcon;

  variant?: ButtonVariant;

  size?: ButtonSize;

  loading?: boolean;

  disabled?: boolean;

  fullWidth?: boolean;

  rounded?: boolean;
}

type ThemeKey = keyof AppTheme["colors"];

export const BUTTON_SIZES = {
  sm: {
    height: 40,
    paddingHorizontal: 16,
    fontSize: 14,
    iconSize: 18,
  },

  md: {
    height: 48,
    paddingHorizontal: 20,
    fontSize: 16,
    iconSize: 20,
  },

  lg: {
    height: 56,
    paddingHorizontal: 24,
    fontSize: 18,
    iconSize: 22,
  },
} as const;

export const BUTTON_VARIANTS = {
  primary: {
    background: "primary",
    text: "white",
    border: "primary",
  },

  secondary: {
    background: "surface",
    text: "text",
    border: "border",
  },

  outline: {
    background: "transparent",
    text: "primary",
    border: "primary",
  },

  ghost: {
    background: "transparent",
    text: "text",
    border: "transparent",
  },

  danger: {
    background: "danger",
    text: "white",
    border: "danger",
  },
} satisfies Record<
  ButtonVariant,
  {
    background: ThemeKey;
    text: ThemeKey;
    border: ThemeKey;
  }
>;
