import styled from "@emotion/native";

import { HEADER_BUTTON_SIZE } from "./types";

export const Container = styled.View(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 20,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.sm,
}));

export const IconGroup = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing.sm,
}));

export const IconButton = styled.Pressable(({ theme }) => ({
  width: HEADER_BUTTON_SIZE,
  height: HEADER_BUTTON_SIZE,
  borderRadius: theme.radius.full,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.border,
  ...theme.shadows.sm,
}));
