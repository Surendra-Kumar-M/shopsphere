import styled from "@emotion/native";

export const Container = styled.Pressable<{
  height: number;
  fullWidth: boolean;
  background: string;
  borderColor: string;
}>(({ height, fullWidth, background, borderColor }) => ({
  height,

  width: fullWidth ? "100%" : "auto",

  flexDirection: "row",

  justifyContent: "center",

  alignItems: "center",

  borderRadius: 16,

  backgroundColor: background,

  borderWidth: 1,

  borderColor,

  gap: 8,

  paddingHorizontal: 20,
}));

export const Loader = styled.ActivityIndicator({});

export const Content = styled.View({
  flexDirection: "row",

  alignItems: "center",

  gap: 8,
});
