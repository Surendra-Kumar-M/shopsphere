import { PressableProps } from "react-native";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends PressableProps {
  uri?: string;
  name?: string;
  size?: AvatarSize;

  bordered?: boolean;
  disabled?: boolean;

  onPress?: () => void;
}

export const AVATAR_SIZE = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
} as const;