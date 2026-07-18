import React from "react";

import { StyledText } from "./styles";

import { AppTextProps, TEXT_VARIANTS } from "./types";



export default function AppText({
  variant = "body",
  weight = "regular",
  color,
  align,
  children,
  ...props
}: AppTextProps) {
  return (
    <StyledText
      {...props}
      variantStyle={TEXT_VARIANTS[variant]}
      weight={weight}
      color={color}
      align={align}>
      {children}
    </StyledText>
  );
}
