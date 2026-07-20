import styled from "@emotion/native";

import { SKELETON_CARD_WIDTH } from "./types";

export const Container = styled.View(({ theme }) => ({
  width: SKELETON_CARD_WIDTH,

  marginRight: theme.spacing.lg,

  borderRadius: theme.radius.lg,

  backgroundColor: theme.colors.surface,

  overflow: "hidden",

  borderWidth: 1,

  borderColor: theme.colors.border,
}));

export const ImageSkeleton = styled.View(({ theme }) => ({
  padding: theme.spacing.sm,
}));

export const Content = styled.View(({ theme }) => ({
  padding: theme.spacing.md,

  gap: theme.spacing.sm,
}));
