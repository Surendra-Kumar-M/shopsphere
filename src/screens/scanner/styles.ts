import styled from "@emotion/native";

import { Colors } from "@/theme/colors";

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

export const LoadingText = styled.Text`
  color: ${Colors.white};
  font-size: 16px;
  margin-top: 12px;
`;

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const ScanBox = styled.View`
  width: 260px;
  height: 260px;
  border-radius: 12px;
  border-width: 2px;
  border-color: #00ff9c;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Hint = styled.Text`
  margin-top: 20px;
  color: ${Colors.white};
  font-size: 14px;
  opacity: 0.8;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;
