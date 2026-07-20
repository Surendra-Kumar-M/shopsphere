import styled from "@emotion/native";

export const Header = styled.View(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacing.md,
  marginBottom: theme.spacing.xxxl,
}));

export const Meta = styled.View(({ theme }) => ({
  gap: theme.spacing.xs,
  alignItems: "center",
}));

export const Actions = styled.View(({ theme }) => ({
  marginTop: theme.spacing.xxxl,
  gap: theme.spacing.md,
}));
