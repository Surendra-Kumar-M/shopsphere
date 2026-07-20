import styled from "@emotion/native";

export const SearchSection = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.lg,
  marginBottom: theme.spacing.lg,
}));

export const SectionHeading = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.lg,
  marginBottom: theme.spacing.md,
}));

export const Footer = styled.View(({ theme }) => ({
  paddingVertical: theme.spacing.lg,
  alignItems: "center",
}));

export const ErrorContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: theme.spacing.lg,
  gap: theme.spacing.lg,
}));

export const ListContent = styled.View(({ theme }) => ({
  paddingBottom: theme.spacing.xxxl,
}));
