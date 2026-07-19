import styled from "@emotion/native";

import { Image } from "expo-image";

import { PROMO_BANNER_HEIGHT } from "./types";

export const Container = styled.Pressable(({ theme }) => ({
  height: PROMO_BANNER_HEIGHT,

  borderRadius: theme.radius.lg,

  overflow: "hidden",

  backgroundColor: theme.colors.primary,

  flexDirection: "row",

  alignItems: "center",

  justifyContent: "space-between",

  paddingHorizontal: theme.spacing.lg,

  marginBottom: theme.spacing.xl,
}));

export const Content = styled.View({
  flex: 1,
});

export const ImageContainer = styled.View({
  justifyContent: "center",

  alignItems: "center",
});

export const BannerImage = styled(Image)({
  width: 140,

  height: 140,

  resizeMode: "contain",
});
