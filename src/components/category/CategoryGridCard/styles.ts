import styled from "@emotion/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import {
  FEATURED_CARD_HEIGHT,
  FEATURED_CARD_WIDTH,
  GRID_CARD_HEIGHT,
} from "./types";

export const GridContainer = styled.Pressable<{ width: number }>(
  ({ theme, width }) => ({
    width,
    height: GRID_CARD_HEIGHT,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  }),
);

export const FeaturedContainer = styled.Pressable(({ theme }) => ({
  width: FEATURED_CARD_WIDTH,
  height: FEATURED_CARD_HEIGHT,
  borderRadius: theme.radius.lg,
  overflow: "hidden",
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.border,
  ...theme.shadows.sm,
}));

export const BackgroundImage = styled(Image)({
  width: "100%",
  height: "100%",
});

export const Overlay = styled(LinearGradient)({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: "70%",
});

export const Content = styled.View(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: theme.spacing.md,
}));

export const ImageWrapper = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export const FeaturedImage = styled(Image)({
  width: 72,
  height: 72,
});

export const GridImage = styled(Image)({
  width: 88,
  height: 88,
});
