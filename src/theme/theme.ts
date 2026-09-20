import { Animation } from "./animation";
import { Colors } from "./colors";
import { Opacity } from "./opacity";
import { Radius } from "./radius";
import { Shadows } from "./shadows";
import { Spacing } from "./spacing";
import {
  Typography,
  FontWeight,
  LineHeight,
  FontFamily,
  LetterSpacing,
} from "./typography";

export const theme = {
  colors: Colors,
  spacing: Spacing,
  radius: Radius,
  shadows: Shadows,
  typography: Typography,
  fontWeight: FontWeight,
  lineHeight: LineHeight,
  fontFamily: FontFamily,
  letterSpacing: LetterSpacing,
  animation: Animation,
  opacity: Opacity,
};

export type AppTheme = typeof theme;
