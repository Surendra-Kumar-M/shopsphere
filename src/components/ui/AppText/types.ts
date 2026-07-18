import { Typography } from "@/theme";
import { TextProps } from "react-native";

export interface AppTextProps extends TextProps {
  variant?: keyof typeof TEXT_VARIANTS;
  weight?: keyof typeof TEXT_WEIGHTS;
  color?: string;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

export const TEXT_WEIGHTS = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const TEXT_VARIANTS = {
  hero: {
    fontSize: Typography.hero,
    lineHeight: 40,
  },

  h1: {
    fontSize: Typography.h1,
    lineHeight: 36,
  },

  h2: {
    fontSize: Typography.h2,
    lineHeight: 32,
  },

  h3: {
    fontSize: Typography.h3,
    lineHeight: 28,
  },

  title: {
    fontSize: Typography.title,
    lineHeight: 24,
  },

  body: {
    fontSize: Typography.body,
    lineHeight: 22,
  },

  bodySmall: {
    fontSize: Typography.bodySmall,
    lineHeight: 20,
  },

  caption: {
    fontSize: Typography.caption,
    lineHeight: 18,
  },

  button: {
    fontSize: Typography.button,
    lineHeight: 22,
  },
} as const;