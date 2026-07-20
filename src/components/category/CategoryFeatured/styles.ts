import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  gap: theme.spacing.md,
}));

export const ListContent = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing.md,
  paddingRight: theme.spacing.lg,
}));
