import styled from "@emotion/native";

export const Header = styled.View(({ theme }) => ({
  gap: theme.spacing.xs,
  marginBottom: theme.spacing.lg,
}));

export const SearchSection = styled.View(({ theme }) => ({
  marginBottom: theme.spacing.xxl,
}));

export const Section = styled.View(({ theme }) => ({
  gap: theme.spacing.md,
  marginBottom: theme.spacing.xxl,
}));

export const SectionHeading = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: theme.spacing.md,
}));

export const ErrorContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: theme.spacing.lg,
  gap: theme.spacing.lg,
}));
