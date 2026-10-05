import { TextInputProps } from "react-native";
import { LucideIcon } from "lucide-react-native";

export type InputVariant = "outlined" | "filled";

export type InputSize = "sm" | "md" | "lg";

export type InputStatus = "default" | "error" | "success";

export interface InputProps extends Omit<TextInputProps, "children"> {
  /**
   * Label displayed above the input
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Visual variant
   */
  variant?: InputVariant;

  /**
   * Input size
   */
  size?: InputSize;

  /**
   * Validation state
   */
  status?: InputStatus;

  /**
   * Left icon
   */
  leftIcon?: LucideIcon;

  /**
   * Right icon
   */
  rightIcon?: LucideIcon;

  /**
   * Left icon press
   */
  onLeftIconPress?: () => void;

  /**
   * Right icon press
   */
  onRightIconPress?: () => void;

  /**
   * Shows loading spinner instead of right icon
   */
  loading?: boolean;

  /**
   * Toggle password visibility
   */
  showPasswordToggle?: boolean;

  /**
   * Stretch to full width
   */
  fullWidth?: boolean;
}

export interface InputSizeConfig {
  height: number;
  fontSize: number;
  iconSize: number;
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
  InputSizeConfig
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
export interface InputVariantStyle {
  backgroundColor: string;
  borderColor: string;
  focusedBorderColor: string;
  errorBorderColor: string;
}
