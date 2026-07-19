import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  marginBottom: theme.spacing.lg,
  gap: theme.spacing.md,
}));

export const LeftContainer = styled.View({
  flex: 1,
});

export const RightContainer = styled.Pressable(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",

  gap: theme.spacing.xs,
}));

export const SubtitleContainer = styled.View(({ theme }) => ({
  marginTop: theme.spacing.xs,
}));
