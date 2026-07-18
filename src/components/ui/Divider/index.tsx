import { useTheme } from "@emotion/react";

import * as S from "./styles";
import { DividerProps } from "./types";

export default function Divider({
  orientation = "horizontal",
  thickness = 1,
  spacing = 12,
  color,
  ...props
}: DividerProps) {
  const theme = useTheme();
  const dividerColor = color ? theme.colors[color] : theme.colors.border;
  return (
    <S.Container
      {...props}
      orientation={orientation}
      thickness={thickness}
      spacing={spacing}
      color={dividerColor}
    />
  );
}
