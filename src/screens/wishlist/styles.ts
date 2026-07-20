import styled from "@emotion/native";

export const Header = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.lg,
  paddingBottom: theme.spacing.md,
}));

export const EmptyContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: theme.spacing.lg,
  gap: theme.spacing.lg,
}));

export const ItemSeparator = styled.View(({ theme }) => ({
  height: theme.spacing.md,
}));

export const ListContent = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.lg,
  paddingBottom: theme.spacing.xxxl,
}));
