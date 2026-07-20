import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing.sm,
}));

export const OriginalPrice = styled.View(({ theme }) => ({
  marginLeft: theme.spacing.xs,
}));
