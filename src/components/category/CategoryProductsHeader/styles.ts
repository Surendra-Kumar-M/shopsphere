import styled from "@emotion/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { CATEGORY_BANNER_HEIGHT } from "./types";

export const Container = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border,
  marginBottom: theme.spacing.lg,
}));

export const TopBar = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.md,
  paddingHorizontal: theme.spacing.lg,
  paddingBottom: theme.spacing.md,
}));

export const BackButton = styled.Pressable(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.radius.full,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.background,
  borderWidth: 1,
  borderColor: theme.colors.border,
}));

export const TitleBlock = styled.View({
  flex: 1,
  gap: 2,
});

export const Banner = styled.View(({ theme }) => ({
  height: CATEGORY_BANNER_HEIGHT,
  marginHorizontal: theme.spacing.lg,
  marginBottom: theme.spacing.lg,
  borderRadius: theme.radius.lg,
  overflow: "hidden",
}));

export const BannerImage = styled(Image)({
  width: "100%",
  height: "100%",
});

export const BannerOverlay = styled(LinearGradient)({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: "100%",
});

export const BannerContent = styled.View(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: theme.spacing.lg,
}));
