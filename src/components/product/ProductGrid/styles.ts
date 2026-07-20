import styled from "@emotion/native";

export const Footer = styled.View(({ theme }) => ({
  paddingVertical: theme.spacing.lg,
  alignItems: "center",
}));

export const EmptyState = styled.View(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: theme.spacing.xxxl,
  gap: theme.spacing.sm,
}));

export const ColumnWrapper = styled.View(({ theme }) => ({
  justifyContent: "space-between",
  paddingHorizontal: theme.spacing.lg,
  marginBottom: theme.spacing.md,
}));
