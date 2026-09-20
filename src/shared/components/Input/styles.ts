import styled from "@emotion/native";
import { Platform, Pressable } from "react-native";

import { Theme } from "@emotion/react";

import AppText from "../AppText";

import { InputStatus, InputVariantStyle } from "./types";

export const Container = styled.View<{
  fullWidth: boolean;
}>(({ fullWidth }) => ({
  width: fullWidth ? "100%" : undefined,
}));

export const Label = styled(AppText)(({ theme }) => ({
  marginBottom: theme.spacing.xs,
}));

export const HelperText = styled(AppText)(({ theme }) => ({
  marginTop: theme.spacing.xs,
}));

export const InputWrapper = styled(Pressable)<{
  height: number;
  borderColor: string;
  backgroundColor: string;
}>(({ theme, height, borderColor, backgroundColor }) => ({
  height,

  flexDirection: "row",

  alignItems: "center",

  borderWidth: 1,

  borderRadius: theme.radius.md,

  borderColor,

  backgroundColor,

  paddingHorizontal: theme.spacing.md,
}));


export const StyledInput = styled.TextInput<{
  fontSize: number;
}>(({ theme, fontSize }) => ({
  flex: 1,

  color: theme.colors.text,

  fontSize,

  paddingVertical: 0,

  includeFontPadding: false,
  borderWidth: 0,
  backgroundColor: "transparent",
  // outlineStyle is a web-only CSS property; Platform.select keeps the native
  // path within valid TextStyle while still suppressing the browser focus ring.
  ...Platform.select({
    web: { outlineStyle: "none" } as object,
    default: {},
  }),
}));


export const IconContainer = styled.Pressable(({ theme }) => ({
  justifyContent: "center",

  alignItems: "center",

  width: 36,

  height: 36,

  borderRadius: theme.radius.full,

  marginHorizontal: theme.spacing.xs,
}));

export const getBorderColor = (
  theme: Theme,
  status: InputStatus,
  focused: boolean,
  variant: InputVariantStyle,
) => {
  if (status === "error") {
    return variant.errorBorderColor;
  }

  if (focused) {
    return variant.focusedBorderColor;
  }

  return variant.borderColor;
};
