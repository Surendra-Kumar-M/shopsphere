import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  marginTop: theme.spacing.lg,
  marginBottom: theme.spacing.xl,
}));

export const LeftContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
});

export const UserInfo = styled.View(({ theme }) => ({
  marginLeft: theme.spacing.md,
}));

export const RightContainer = styled.View({
  justifyContent: "center",
  alignItems: "center",
});
