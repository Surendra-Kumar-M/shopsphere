import styled from "@emotion/native";
import { Image } from "expo-image";

import { GALLERY_HEIGHT, THUMBNAIL_SIZE } from "./types";

export const Container = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border,
}));

export const MainImageWrapper = styled.View({
  height: GALLERY_HEIGHT,
  justifyContent: "center",
  alignItems: "center",
});

export const MainImage = styled(Image)({
  width: "100%",
  height: "100%",
});

export const ThumbnailList = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing.sm,
  paddingHorizontal: theme.spacing.lg,
  paddingVertical: theme.spacing.md,
}));

export const ThumbnailButton = styled.Pressable<{ selected: boolean }>(
  ({ theme, selected }) => ({
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: theme.radius.md,
    overflow: "hidden",
    borderWidth: selected ? 2 : 1,
    borderColor: selected ? theme.colors.primary : theme.colors.border,
    backgroundColor: theme.colors.surface,
  }),
);

export const ThumbnailImage = styled(Image)({
  width: "100%",
  height: "100%",
});

export const Dots = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: theme.spacing.xs,
  paddingBottom: theme.spacing.md,
}));

export const Dot = styled.View<{ active: boolean }>(({ theme, active }) => ({
  width: active ? 20 : 8,
  height: 8,
  borderRadius: theme.radius.full,
  backgroundColor: active ? theme.colors.primary : theme.colors.border,
}));
