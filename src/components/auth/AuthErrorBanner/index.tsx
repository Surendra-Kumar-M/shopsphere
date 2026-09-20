import { useEffect, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { AlertCircle, CheckCircle2, X } from "lucide-react-native";

import { AppText } from "@/shared/components";
import { withAlpha } from "@/utils/color";
import { Animation } from "@/theme/animation";

export type AuthErrorVariant = "error" | "success";

export interface AuthErrorBannerProps {
  message?: string | null;
  variant?: AuthErrorVariant;
  onDismiss?: () => void;
}

const BannerContainer = styled(Animated.View)<{ variant: AuthErrorVariant }>(
  ({ theme, variant }) => {
    const color =
      variant === "success" ? theme.colors.success : theme.colors.danger;

    return {
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      backgroundColor: withAlpha(color, 0.08),
      borderWidth: 1,
      borderColor: withAlpha(color, 0.2),
      marginBottom: theme.spacing.md,
    };
  },
);

const Content = styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.xs,
}));

/**
 * A reusable animated banner for displaying authentication errors or success messages.
 * Respects accessibility guidelines with role="alert" and polite live region.
 */
export default function AuthErrorBanner({
  message,
  variant = "error",
  onDismiss,
}: AuthErrorBannerProps) {
  const theme = useTheme();
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(-10));

  useEffect(() => {
    if (message) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: Animation.duration.normal,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: Animation.duration.normal,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: Animation.duration.fast,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -10,
          duration: Animation.duration.fast,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [message, opacity, translateY]);

  if (!message) return null;

  const Icon = variant === "success" ? CheckCircle2 : AlertCircle;
  const color = variant === "success" ? "success" : "danger";
  const iconColor = theme.colors[color];

  return (
    <BannerContainer
      variant={variant}
      style={{ opacity, transform: [{ translateY }] }}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite">
      <Content>
        <Icon size={18} color={iconColor} />
        <AppText variant="bodySmall" color={color} style={{ flex: 1 }}>
          {message}
        </AppText>
      </Content>
      {onDismiss && (
        <TouchableOpacity
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss message"
          style={{ paddingLeft: theme.spacing.sm }}>
          <X size={18} color={iconColor} />
        </TouchableOpacity>
      )}
    </BannerContainer>
  );
}
