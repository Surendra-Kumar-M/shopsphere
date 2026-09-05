import { useTheme } from "@emotion/react";

import { SPINNER_SIZES, SpinnerProps } from "./types";

import { StyledSpinner } from "./styles";

export default function Spinner({
  size = "md",

  color = "primary",
}: SpinnerProps) {
  const theme = useTheme();

  return (
    <StyledSpinner size={SPINNER_SIZES[size]} color={theme.colors[color]} />
  );
}
