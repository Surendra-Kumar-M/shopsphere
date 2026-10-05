import { useRef, useState } from "react";
import { TextInput } from "react-native";

import { useTheme } from "@emotion/react";
import { Eye, EyeOff } from "lucide-react-native";

import Icon from "../Icon";
import Spinner from "../Spinner";

import * as S from "./styles";

import { INPUT_SIZES, inputVariants } from "./types";

import { InputProps } from "./types";

export default function Input({
  label,

  helperText,

  error,

  variant = "outlined",

  size = "md",

  status = "default",

  leftIcon,

  rightIcon,

  onLeftIconPress,

  onRightIconPress,

  loading = false,

  showPasswordToggle = false,

  secureTextEntry = false,

  fullWidth = true,

  editable = true,

  onFocus,

  onBlur,

  ...props
}: InputProps) {
  const theme = useTheme();

  const inputRef = useRef<TextInput>(null);

  const [focused, setFocused] = useState(false);

  const [hidden, setHidden] = useState(Boolean(secureTextEntry));

  const styles = inputVariants(theme)[variant];

  const config = INPUT_SIZES[size];

  const borderColor = S.getBorderColor(
    theme,
    error ? "error" : status,
    focused,
    styles,
  );

  const handleFocus = (e: Parameters<NonNullable<typeof onFocus>>[0]) => {
    setFocused(true);

    onFocus?.(e);
  };

  const handleBlur = (e: Parameters<NonNullable<typeof onBlur>>[0]) => {
    setFocused(false);

    onBlur?.(e);
  };

  const renderLeftIcon = () => {
    if (!leftIcon) return null;

    return (
      <S.IconContainer disabled={!onLeftIconPress} onPress={onLeftIconPress}>
        <Icon icon={leftIcon} size={config.iconSize} color="textSecondary" />
      </S.IconContainer>
    );
  };

  const renderRightIcon = () => {
    if (loading) {
      return (
        <S.IconContainer disabled>
          <Spinner size="sm" color="primary" />
        </S.IconContainer>
      );
    }

    if (showPasswordToggle) {
      return (
        <S.IconContainer onPress={() => setHidden((prev) => !prev)}>
          <Icon
            icon={hidden ? Eye : EyeOff}
            size={config.iconSize}
            color="textSecondary"
          />
        </S.IconContainer>
      );
    }

    if (rightIcon) {
      return (
        <S.IconContainer
          disabled={!onRightIconPress}
          onPress={onRightIconPress}>
          <Icon icon={rightIcon} size={config.iconSize} color="textSecondary" />
        </S.IconContainer>
      );
    }

    return null;
  };

  return (
    <S.Container fullWidth={fullWidth}>
      {label && <S.Label variant="bodySmall">{label}</S.Label>}

      <S.InputWrapper
        height={config.height}
        borderColor={borderColor}
        backgroundColor={styles.backgroundColor}
        onPress={() => inputRef.current?.focus()}>
        {renderLeftIcon()}

        <S.StyledInput
          ref={inputRef}
          {...props}
          editable={editable}
          secureTextEntry={hidden}
          fontSize={config.fontSize}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {renderRightIcon()}
      </S.InputWrapper>

      {error ? (
        <S.HelperText variant="caption" color="danger">
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
