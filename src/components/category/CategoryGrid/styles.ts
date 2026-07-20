import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  gap: theme.spacing.md,
}));

export const Grid = styled.View(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.spacing.md,
}));

export const EmptyState = styled.View(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: theme.spacing.xxxl,
  gap: theme.spacing.sm,
}));

export const SkeletonGrid = styled.View(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.spacing.md,
}));
