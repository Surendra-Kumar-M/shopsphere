import styled from "@emotion/native";
import { Image } from "expo-image";

import { CART_ITEM_IMAGE_SIZE } from "./types";

export const Container = styled.Pressable(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing.md,
  padding: theme.spacing.md,
  borderRadius: theme.radius.lg,
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.border,
  ...theme.shadows.sm,
}));

export const ImageWrapper = styled.View(({ theme }) => ({
  width: CART_ITEM_IMAGE_SIZE,
  height: CART_ITEM_IMAGE_SIZE,
  borderRadius: theme.radius.md,
  overflow: "hidden",
  backgroundColor: theme.colors.background,
}));

export const ProductImage = styled(Image)({
  width: "100%",
  height: "100%",
});

export const Content = styled.View({
  flex: 1,
  justifyContent: "space-between",
});

export const TopRow = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: theme.spacing.sm,
}));

export const TitleBlock = styled.View({
  flex: 1,
});

export const BottomRow = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing.sm,
}));

export const QuantityControls = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.sm,
  borderWidth: 1,
  borderColor: theme.colors.border,
  borderRadius: theme.radius.full,
  paddingHorizontal: theme.spacing.xs,
  paddingVertical: theme.spacing.xs,
}));

export const QuantityButton = styled.Pressable(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: theme.radius.full,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.background,
}));

export const RemoveButton = styled.Pressable(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: theme.radius.full,
  alignItems: "center",
  justifyContent: "center",
}));
