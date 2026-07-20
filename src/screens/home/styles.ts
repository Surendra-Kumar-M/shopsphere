import styled from "@emotion/native";

export const ErrorContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: theme.spacing.lg,
}));

export const ErrorMessage = styled.View(({ theme }) => ({
  marginTop: theme.spacing.lg,
}));

export const ErrorAction = styled.View(({ theme }) => ({
  marginTop: theme.spacing.xxl,
}));

export const EmptySearch = styled.View(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacing.md,
  marginTop: theme.spacing.lg,
}));
