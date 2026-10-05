import styled from "@emotion/native";

import AppText from "../AppText";

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

export const InputWrapper = styled.View<{
  borderColor: string;
  backgroundColor: string;
  height: number;
}>(({ theme, borderColor, backgroundColor, height }) => ({
  height,

  flexDirection: "row",

  alignItems: "center",

  borderRadius: theme.radius.md,

  borderWidth: 1,

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
}));

export const IconContainer = styled.View(({ theme }) => ({
  justifyContent: "center",

  alignItems: "center",

  marginHorizontal: theme.spacing.xs,
}));


import { InputStatus } from "@/components/ui/Input/types";
import { Theme } from "@emotion/react";

export const getBorderColor = (
  theme: Theme,
  status: InputStatus,
  focused: boolean,
  variant: {
    borderColor: string;
    focusedBorderColor: string;
    errorBorderColor: string;
  },
) => {
  if (status === "error") return variant.errorBorderColor;

  if (focused) return variant.focusedBorderColor;

  return variant.borderColor;
};
