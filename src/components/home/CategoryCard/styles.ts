import styled from "@emotion/native";
import { Image } from "expo-image";

import { CATEGORY_CARD_SIZE, CATEGORY_IMAGE_SIZE } from "./types";

export const Container = styled.Pressable<{
  selected: boolean;
}>(({ theme, selected }) => ({
  width: CATEGORY_CARD_SIZE,

  alignItems: "center",

  marginRight: theme.spacing.md,
}));

export const IconWrapper = styled.View<{
  selected: boolean;
}>(({ theme, selected }) => ({
  width: CATEGORY_CARD_SIZE,

  height: CATEGORY_CARD_SIZE,

  borderRadius: theme.radius.lg,

  justifyContent: "center",

  alignItems: "center",

  backgroundColor: selected ? theme.colors.primary : theme.colors.surface,

  borderWidth: 1,

  borderColor: selected ? theme.colors.primary : theme.colors.border,
}));

export const CategoryImage = styled(Image)({
  width: CATEGORY_IMAGE_SIZE,

  height: CATEGORY_IMAGE_SIZE,
});

export const NameContainer = styled.View(({ theme }) => ({
  marginTop: theme.spacing.sm,

  alignItems: "center",
}));
