import styled from "@emotion/native";

export const Container = styled.Pressable({
  overflow: "hidden",
});

export const Header = styled.View(({ theme }) => ({
  padding: theme.spacing.md,
}));

export const Content = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.md,
  paddingBottom: theme.spacing.md,
}));

export const Footer = styled.View(({ theme }) => ({
  padding: theme.spacing.md,

  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",
}));
