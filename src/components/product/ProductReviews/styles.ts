import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  gap: theme.spacing.lg,
}));

export const Summary = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.sm,
}));

export const ReviewList = styled.View(({ theme }) => ({
  gap: theme.spacing.md,
}));

export const ReviewCard = styled.View(({ theme }) => ({
  padding: theme.spacing.lg,
  borderRadius: theme.radius.lg,
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.border,
  gap: theme.spacing.sm,
}));

export const ReviewHeader = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing.md,
}));

export const Stars = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.xs,
}));
