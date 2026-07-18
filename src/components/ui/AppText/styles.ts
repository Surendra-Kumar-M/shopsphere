import styled from "@emotion/native";

import { TEXT_WEIGHTS } from "./types";

export const StyledText = styled.Text<{
  variantStyle: {
    fontSize: number;
    lineHeight: number;
  };
  weight: keyof typeof TEXT_WEIGHTS;
  color?: string;
  align?: "left" | "center" | "right";
}>(({ theme, variantStyle, weight, color, align }) => ({
  fontSize: variantStyle.fontSize,
  lineHeight: variantStyle.lineHeight,

  fontWeight: TEXT_WEIGHTS[weight],

  color: color ?? theme.colors.text,

  textAlign: align ?? "left",
}));
