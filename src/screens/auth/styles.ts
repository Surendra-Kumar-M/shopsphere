import styled from "@emotion/native";

export const Form = styled.View(({ theme }) => ({
  gap: theme.spacing.lg,
}));

export const Footer = styled.View(({ theme }) => ({
  marginTop: theme.spacing.xxl,
  alignItems: "center",
  gap: theme.spacing.md,
}));

export const LinkRow = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing.xs,
}));

export const SocialRow = styled.View(({ theme }) => ({
  gap: theme.spacing.md,
  marginTop: theme.spacing.lg,
}));

export const DividerRow = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.md,
  marginVertical: theme.spacing.lg,
}));

export const DividerLine = styled.View(({ theme }) => ({
  flex: 1,
  height: 1,
  backgroundColor: theme.colors.border,
}));

export const ErrorBanner = styled.View(({ theme }) => ({
  padding: theme.spacing.md,
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.danger + "14",
  borderWidth: 1,
  borderColor: theme.colors.danger + "33",
}));
