import styled from "@emotion/native";

export const Layout = styled.View({
  flex: 1,
});

export const Content = styled.View(({ theme }) => ({
  padding: theme.spacing.lg,
  gap: theme.spacing.xxl,
  paddingBottom: theme.spacing.huge,
}));

export const Section = styled.View(({ theme }) => ({
  gap: theme.spacing.md,
}));

export const MetaRow = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing.sm,
}));

export const RatingRow = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.xs,
}));

export const BottomBar = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.md,
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.md,
  backgroundColor: theme.colors.surface,
  borderTopWidth: 1,
  borderTopColor: theme.colors.border,
  ...theme.shadows.md,
}));

export const BottomAction = styled.View({
  flex: 1,
});

export const ErrorContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: theme.spacing.lg,
  gap: theme.spacing.lg,
}));

export const GalleryWrapper = styled.View({
  position: "relative",
});
