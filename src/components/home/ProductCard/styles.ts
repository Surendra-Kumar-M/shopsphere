import styled from "@emotion/native";
import { Image } from "expo-image";

import { PRODUCT_CARD_WIDTH, PRODUCT_IMAGE_HEIGHT } from "./types";

export const Container = styled.Pressable(({ theme }) => ({
  width: PRODUCT_CARD_WIDTH,

  marginRight: theme.spacing.lg,

  borderRadius: theme.radius.lg,

  backgroundColor: theme.colors.surface,

  overflow: "hidden",

  borderWidth: 1,

  borderColor: theme.colors.border,
}));

export const ImageContainer = styled.View({
  height: PRODUCT_IMAGE_HEIGHT,

  justifyContent: "center",

  alignItems: "center",
});

export const ProductImage = styled(Image)({
  width: "100%",

  height: "100%",
});

export const Content = styled.View(({ theme }) => ({
  padding: theme.spacing.md,
}));

export const PriceRow = styled.View(({ theme }) => ({
  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",

  marginTop: theme.spacing.sm,
}));

export const RatingRow = styled.View(({ theme }) => ({
  flexDirection: "row",

  alignItems: "center",

  marginTop: theme.spacing.xs,

  gap: theme.spacing.xs,
}));

export const WishlistButton = styled.Pressable(({ theme }) => ({
  position: "absolute",

  top: theme.spacing.sm,

  right: theme.spacing.sm,

  width: 36,

  height: 36,

  borderRadius: theme.radius.full,

  justifyContent: "center",

  alignItems: "center",

  backgroundColor: theme.colors.white,

  zIndex: 10,

  elevation: 2,
}));