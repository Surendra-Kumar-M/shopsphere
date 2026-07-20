import { KeyboardAvoidingView, Platform, RefreshControl } from "react-native";

import { useTheme } from "@emotion/react";

import * as S from "./styles";

import { ScreenProps } from "./types";

export default function Screen({
  children,

  scrollable = false,

  safeArea = true,

  padding = true,

  keyboardAvoiding = true,

  backgroundColor = "background",

  contentContainerStyle,

  refreshing = false,

  onRefresh,

  ...props
}: ScreenProps) {
  const theme = useTheme();

  const refreshControl =
    scrollable && onRefresh ? (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={theme.colors.primary}
        colors={[theme.colors.primary]}
      />
    ) : undefined;

  const content = scrollable ? (
    <S.ScrollContainer
      {...props}
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl}
      contentContainerStyle={[
        {
          flexGrow: 1,
        },
        contentContainerStyle,
      ]}>
      <S.Container padding={padding}>{children}</S.Container>
    </S.ScrollContainer>
  ) : (
    <S.Container padding={padding}>{children}</S.Container>
  );

  const wrapped = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  if (!safeArea) {
    return wrapped;
  }

  return (
    <S.SafeContainer background={theme.colors[backgroundColor]}>
      {wrapped}
    </S.SafeContainer>
  );
}
