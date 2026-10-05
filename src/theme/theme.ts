import { Colors } from "./colors";
import { Radius } from "./radius";
import { Shadows } from "./shadows";
import { Spacing } from "./spacing";
import { Typography } from "./typography";

export const theme = {
  colors: Colors,
  spacing: Spacing,
  radius: Radius,
  shadows: Shadows,
  typography: Typography,
};

export type AppTheme = typeof theme;
