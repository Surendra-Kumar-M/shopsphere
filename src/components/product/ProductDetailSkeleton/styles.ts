import styled from "@emotion/native";

export const Container = styled.View({
  flex: 1,
});

export const Content = styled.View(({ theme }) => ({
  padding: theme.spacing.lg,
  gap: theme.spacing.md,
}));
