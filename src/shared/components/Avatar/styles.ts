import styled from "@emotion/native";
import { Image } from "expo-image";

export const Container = styled.Pressable<{
  size: number;
  bordered: boolean;
}>(({ theme, size, bordered }) => ({
  width: size,
  height: size,
  borderRadius: size / 2,

  justifyContent: "center",
  alignItems: "center",

  overflow: "hidden",

  backgroundColor: theme.colors.surface,

  borderWidth: bordered ? 2 : 0,
  borderColor: theme.colors.primary,
}));

export const StyledImage = styled(Image)({
  width: "100%",
  height: "100%",
});

export const Initials = styled.Text<{
  fontSize: number;
}>(({ theme, fontSize }) => ({
  fontSize,

  fontWeight: "700",

  color: theme.colors.text,
}));
