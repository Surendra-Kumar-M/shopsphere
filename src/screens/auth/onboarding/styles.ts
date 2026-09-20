import styled from "@emotion/native";

export const TopBar = styled.View(({ theme }) => ({
  alignItems: "flex-end",
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.sm,
}));

export const Slide = styled.View<{ width: number }>(({ theme, width }) => ({
  width,
  paddingHorizontal: theme.spacing.xxxl,
  justifyContent: "center",
  alignItems: "center",
}));

export const Illustration = styled.View(({ theme }) => ({
  width: 160,
  height: 160,
  borderRadius: theme.radius.xl,
  backgroundColor: theme.colors.primary + "14",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing.xxxl,
}));

export const Description = styled.View(({ theme }) => ({
  marginTop: theme.spacing.lg,
  maxWidth: 320,
}));

export const Footer = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.lg,
  paddingBottom: theme.spacing.xxl,
  gap: theme.spacing.xxl,
}));

export const Dots = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: theme.spacing.sm,
}));


