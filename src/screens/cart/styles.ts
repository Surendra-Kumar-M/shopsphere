import styled from "@emotion/native";

export const Header = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.lg,
  paddingBottom: theme.spacing.md,
}));

export const ListContent = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.lg,
  gap: theme.spacing.md,
  paddingBottom: theme.spacing.lg,
}));

export const EmptyContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: theme.spacing.lg,
  gap: theme.spacing.lg,
}));

export const Layout = styled.View({
  flex: 1,
});
