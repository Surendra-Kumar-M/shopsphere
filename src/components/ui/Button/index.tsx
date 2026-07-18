
import { useTheme } from "@emotion/react";

import { AppText } from "@/components/ui";

import * as S from "./styles";

import { ButtonProps, BUTTON_SIZES, BUTTON_VARIANTS } from "./types";

export default function Button({
  title,

  variant = "primary",

  size = "md",

  loading = false,

  disabled = false,

  fullWidth = false,

  leftIcon,

  rightIcon,

  ...props
}: ButtonProps) {
  const theme = useTheme();

  const button = BUTTON_SIZES[size];

  const config = BUTTON_VARIANTS[variant];

  const background = theme.colors[config.background];

  const color = theme.colors[config.text];

  const borderColor = theme.colors[config.border];

  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;

  return (
    <S.Container
      {...props}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      height={button.height}
      background={background}
      borderColor={borderColor}>
      {loading ? (
        <S.Loader color={color} />
      ) : (
        <S.Content>
          {LeftIcon && <LeftIcon size={button.iconSize} color={color} />}

          <AppText variant="button" weight="semibold" color={color}>
            {title}
          </AppText>

          {RightIcon && <RightIcon size={button.iconSize} color={color} />}
        </S.Content>
      )}
    </S.Container>
  );
}
