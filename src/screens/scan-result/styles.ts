import styled from "@emotion/native";

import { Colors } from "@/theme/colors";

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
  padding: 20px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  color: ${Colors.text};
`;

export const Card = styled.View`
  padding: 24px;
  border-radius: 16px;
  background-color: ${Colors.surface};
  align-items: center;
  border-width: 1px;
  border-color: ${Colors.border};
`;

export const CodeLabel = styled.Text`
  font-size: 13px;
  color: ${Colors.textMuted};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const CodeText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.text};
`;

export const ButtonGroup = styled.View`
  margin-top: 30px;
  gap: 12px;
`;
