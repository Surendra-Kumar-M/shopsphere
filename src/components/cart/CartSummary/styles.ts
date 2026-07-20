import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  gap: theme.spacing.md,
  padding: theme.spacing.lg,
  borderTopWidth: 1,
  borderTopColor: theme.colors.border,
  backgroundColor: theme.colors.surface,
  ...theme.shadows.md,
}));

export const Row = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});
