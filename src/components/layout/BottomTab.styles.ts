import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  flexDirection: "row",

  backgroundColor: theme.colors.surface,

  borderTopWidth: 1,

  borderTopColor: theme.colors.border,

  paddingTop: theme.spacing.sm,

  paddingHorizontal: theme.spacing.sm,

  ...theme.shadows.sm,
}));

export const TabButton = styled.Pressable(({ theme }) => ({
  flex: 1,

  alignItems: "center",

  justifyContent: "center",

  gap: theme.spacing.xs,

  paddingVertical: theme.spacing.xs,
}));

export const IconWrapper = styled.View({
  position: "relative",
});

export const Badge = styled.View(({ theme }) => ({
  position: "absolute",

  top: -6,

  right: -10,

  minWidth: 18,

  height: 18,

  borderRadius: theme.radius.full,

  backgroundColor: theme.colors.danger,

  alignItems: "center",

  justifyContent: "center",

  paddingHorizontal: theme.spacing.xs,
}));
