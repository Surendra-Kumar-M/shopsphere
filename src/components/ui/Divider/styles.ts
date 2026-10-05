import styled from "@emotion/native";

export const Container = styled.View<{
  orientation: "horizontal" | "vertical";
  thickness: number;
  color: string;
  spacing: number;
}>(({ orientation, thickness, color, spacing }) => ({
  backgroundColor: color,

  width: orientation === "horizontal" ? "100%" : thickness,

  height: orientation === "horizontal" ? thickness : "100%",

  marginVertical: orientation === "horizontal" ? spacing : 0,

  marginHorizontal: orientation === "vertical" ? spacing : 0,
}));
