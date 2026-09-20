import styled from "@emotion/native";

import { AppText, Button } from "@/shared/components";

export interface SocialAuthRowProps {
  onGooglePress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Container = styled.View(({ theme }) => ({
  gap: theme.spacing.md,
  marginTop: theme.spacing.lg,
}));

const DividerRow = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.md,
  marginBottom: theme.spacing.lg,
}));

const DividerLine = styled.View(({ theme }) => ({
  flex: 1,
  height: 1,
  backgroundColor: theme.colors.border,
}));

/**
 * A reusable social authentication component.
 * Provides a visual separator and a Google sign-in button.
 */
export default function SocialAuthRow({
  onGooglePress,
  loading = false,
  disabled = false,
}: SocialAuthRowProps) {
  return (
    <Container>
      <DividerRow>
        <DividerLine />
        <AppText variant="caption" color="textSecondary">
          or continue with
        </AppText>
        <DividerLine />
      </DividerRow>

      <Button
        title="Continue with Google"
        variant="outline"
        fullWidth
        disabled={disabled || loading}
        loading={loading}
        onPress={onGooglePress}
        accessibilityRole="button"
        accessibilityLabel="Continue with Google"
      />
    </Container>
  );
}
