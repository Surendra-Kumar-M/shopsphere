import { PressableProps } from "react-native";
import { ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

import { LucideIcon } from "lucide-react-native";

export interface ButtonProps extends PressableProps {
  title: string;

  variant?: ButtonVariant;
  size?: ButtonSize;

  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;

  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

import { AppTheme } from "@/theme";

type ThemeColor = keyof AppTheme["colors"];

export const BUTTON_SIZES = {
  sm: {
    height: 40,
    paddingHorizontal: 16,
    fontSize: 14,
    iconSize: 16,
  },

  md: {
    height: 48,
    paddingHorizontal: 20,
    fontSize: 16,
    iconSize: 18,
  },

  lg: {
    height: 56,
    paddingHorizontal: 24,
    fontSize: 18,
    iconSize: 20,
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
    background: ThemeColor;
    text: ThemeColor;
    border: ThemeColor;
  }
>;
