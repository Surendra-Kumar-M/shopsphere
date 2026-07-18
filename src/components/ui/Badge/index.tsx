import { useTheme } from "@emotion/react";

import { AppText } from "@/components/ui";

import * as S from "./styles";
import { BADGE_CONFIG, BADGE_SIZES, BadgeProps } from "./types";

export default function Badge({
  label,

  variant= "sale",

  size = "md",

  leftIcon,

  rightIcon,
}: BadgeProps) {
  const theme = useTheme();

  const badge = BADGE_SIZES[size];

const config = BADGE_CONFIG[variant];

const background = theme.colors[config.background];
const color = theme.colors[config.text];

const LeftIcon = leftIcon;
const RightIcon = rightIcon;

  return (
    <S.Container
      background={background}
      paddingHorizontal={badge.paddingHorizontal}
      paddingVertical={badge.paddingVertical}>
      <S.Content>
        {LeftIcon && <LeftIcon size={badge.iconSize} color={color} />}

        <AppText variant="caption" weight="semibold" color={color}>
          {label}
        </AppText>

        {RightIcon && <RightIcon size={badge.iconSize} color={color} />}
      </S.Content>
    </S.Container>
  );
}
