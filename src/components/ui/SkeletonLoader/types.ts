import { ViewProps, DimensionValue } from "react-native";

export interface SkeletonProps extends ViewProps {
  width?: DimensionValue;
  height?: number;
  radius?: number;
}

export const SHIMMER_DURATION = 1200;

export const DEFAULT_SKELETON = {
  width: "100%",
  height: 16,
  radius: 8,
} as const;
