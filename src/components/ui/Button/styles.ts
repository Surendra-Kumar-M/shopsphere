import styled from "@emotion/native";

export const Container = styled.Pressable<{
  height: number;
  fullWidth: boolean;
  background: string;
  borderColor: string;
  iconOnly: boolean;
}>(({ theme, height, fullWidth, background, borderColor, iconOnly }) => ({
  height,

  width: iconOnly ? height : fullWidth ? "100%" : undefined,

  flexDirection: "row",

  justifyContent: "center",

  alignItems: "center",

  backgroundColor: background,

  borderWidth: 1,

  borderColor,

  borderRadius: iconOnly ? height / 2 : theme.radius.md,

  paddingHorizontal: iconOnly ? 0 : theme.spacing.lg,

  paddingVertical: 0,

  opacity: 1,
}));

export const Loader = styled.ActivityIndicator({});

export const Content = styled.View(({ theme }) => ({
  flexDirection: "row",

  alignItems: "center",

  justifyContent: "center",

  gap: theme.spacing.sm,
}));
