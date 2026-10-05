import styled from "@emotion/native";
import { DimensionValue } from "react-native";

export const Container = styled.View<{
  width: DimensionValue;
  height: number;
  radius: number;
}>(({ theme, width, height, radius }) => ({
  width,
  height,
  overflow: "hidden",
  borderRadius: radius,
  backgroundColor: theme.colors.primaryLight,
}));
