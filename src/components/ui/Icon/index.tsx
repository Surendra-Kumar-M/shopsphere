import { useTheme } from "@emotion/react";

import { IconProps } from "./types";

export default function Icon({
  icon: IconComponent,
  size = 20,
  color = "text",
  strokeWidth = 2,
}: IconProps) {
  const theme = useTheme();

  return (
    <IconComponent
      size={size}
      color={theme.colors[color]}
      strokeWidth={strokeWidth}
    />
  );
}
