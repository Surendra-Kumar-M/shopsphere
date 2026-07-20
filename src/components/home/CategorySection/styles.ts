import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  marginBottom: theme.spacing.xxl,
}));

export const SkeletonCard = styled.View(({ theme }) => ({
  width: 88,
  alignItems: "center",
  marginRight: theme.spacing.lg,
  gap: theme.spacing.sm,
}));
