import { TextInputProps } from "react-native";
import { LucideIcon } from "lucide-react-native";

export type InputVariant = "outlined" | "filled";

export type InputSize = "sm" | "md" | "lg";

export type InputStatus = "default" | "error" | "success";

export interface InputProps extends Omit<TextInputProps, "children"> {
  label?: string;

  helperText?: string;

  error?: string;

  variant?: InputVariant;

  size?: InputSize;

  status?: InputStatus;

  leftIcon?: LucideIcon;

  rightIcon?: LucideIcon;

  fullWidth?: boolean;

  loading?: boolean;

  showPasswordToggle?: boolean;
}

import { Theme } from "@emotion/react";

export const INPUT_SIZES = {
  sm: {
    height: 40,
    fontSize: 14,
    iconSize: 18,
  },

  md: {
    height: 48,
    fontSize: 16,
    iconSize: 20,
  },

  lg: {
    height: 56,
    fontSize: 18,
    iconSize: 22,
  },
} satisfies Record<
  InputSize,
  {
    height: number;
    fontSize: number;
    iconSize: number;
  }
>;

export const inputVariants = (theme: Theme) =>
  ({
    outlined: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      focusedBorderColor: theme.colors.primary,
      errorBorderColor: theme.colors.danger,
    },

    filled: {
      backgroundColor: theme.colors.textSecondary,
      borderColor: "transparent",
      focusedBorderColor: theme.colors.primary,
      errorBorderColor: theme.colors.danger,
    },
  }) satisfies Record<InputVariant, any>;
