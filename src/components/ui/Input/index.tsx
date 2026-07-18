import { useState } from "react";
import { ActivityIndicator } from "react-native";

import { useTheme } from "@emotion/react";

import { Eye, EyeOff } from "lucide-react-native";

import Icon from "../Icon";


import { INPUT_SIZES, InputProps, inputVariants } from "./types";

import * as S from "./styles";

export default function Input({
  label,

  helperText,

  error,

  variant = "outlined",

  size = "md",

  status = "default",

  leftIcon,

  rightIcon,

  fullWidth = true,

  loading = false,

  showPasswordToggle = false,

  secureTextEntry,

  editable = true,

  ...props
}: InputProps) {
  const theme = useTheme();

  const [focused, setFocused] = useState(false);

  const [hidden, setHidden] = useState(secureTextEntry);

  const styles = inputVariants(theme)[variant];

  const input = INPUT_SIZES[size];

  const borderColor= S.getBorderColor(
    theme,
    error ? "error" : status,
    focused,
    styles,
  );

  return (
    <S.Container fullWidth={fullWidth}>
      {label && <S.Label variant="bodySmall">{label}</S.Label>}

      <S.InputWrapper
        height={input.height}
        borderColor={borderColor}
        backgroundColor={styles.backgroundColor}>
        {leftIcon && (
          <S.IconContainer>
            <Icon icon={leftIcon} size={input.iconSize} color="textSecondary" />
          </S.IconContainer>
        )}

        <S.StyledInput
          {...props}
          editable={editable}
          secureTextEntry={hidden}
          fontSize={input.fontSize}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {loading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : showPasswordToggle ? (
          <S.IconContainer>
            <Icon
              icon={hidden ? Eye : EyeOff}
              size={input.iconSize}
              color="textSecondary"
            />
          </S.IconContainer>
        ) : (
          rightIcon && (
            <S.IconContainer>
              <Icon
                icon={rightIcon}
                size={input.iconSize}
                color="textSecondary"
              />
            </S.IconContainer>
          )
        )}
      </S.InputWrapper>

      {error ? (
        <S.HelperText variant="caption" color="error">
          {error}
        </S.HelperText>
      ) : helperText ? (
        <S.HelperText variant="caption" color="textSecondary">
          {helperText}
        </S.HelperText>
      ) : null}
    </S.Container>
  );
}
