import { LucideIcon } from "lucide-react-native";


export interface BadgeProps {
  label: string;

  variant?: keyof typeof BADGE_VARIANTS;

  size?: keyof typeof BADGE_SIZES;

  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export const BADGE_VARIANTS = {
  sale: "sale",
  featured: "featured",
  trending: "trending",
  newArrival: "newArrival",
  bestSeller: "bestSeller",
  outOfStock: "outOfStock",
  inStock: "inStock",
  freeDelivery: "freeDelivery",
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANTS;

export const BADGE_SIZES = {
  sm: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 10,
    iconSize: 10,
  },

  md: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    iconSize: 12,
  },

  lg: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    iconSize: 14,
  },
} as const;

export const BADGE_CONFIG = {
  sale: {
    background: "danger",
    text: "white",
  },

  featured: {
    background: "primary",
    text: "white",
  },

  trending: {
    background: "warning",
    text: "white",
  },

  newArrival: {
    background: "info",
    text: "white",
  },

  bestSeller: {
    background: "success",
    text: "white",
  },

  outOfStock: {
    background: "textMuted",
    text: "white",
  },

  inStock: {
    background: "success",
    text: "white",
  },

  freeDelivery: {
    background: "primaryLight",
    text: "white",
  },
} as const;