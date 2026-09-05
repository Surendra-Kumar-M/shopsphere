import styled from "@emotion/native";

export const Container = styled.View<{
  background: string;
  paddingVertical: number;
  paddingHorizontal: number;
}>(({ background, paddingVertical, paddingHorizontal }) => ({
  alignSelf: "flex-start",

  flexDirection: "row",

  alignItems: "center",

  justifyContent: "center",

  borderRadius: 999,

  backgroundColor: background,

  paddingVertical,

  paddingHorizontal,
}));

export const Content = styled.View({
  flexDirection: "row",

  alignItems: "center",

  gap: 4,
});

