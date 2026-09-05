import styled from "@emotion/native";

import { Colors } from "@/theme/colors";

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
`;

export const ChatContent = styled.View`
  padding-horizontal: 16px;
  padding-vertical: 12px;
`;

export const MessageBubble = styled.View<{
  sender: "user" | "bot" | "agent";
}>`
  max-width: 75%;
  padding: 12px;
  border-radius: 14px;
  margin-vertical: 6px;

  ${({ sender }) => {
    if (sender === "user") {
      return `
        background-color: ${Colors.primary};
        align-self: flex-end;
      `;
    }

    if (sender === "agent") {
      return `
        background-color: ${Colors.info}22;
        align-self: flex-start;
      `;
    }

    return `
      background-color: ${Colors.surface};
      align-self: flex-start;
      border-width: 1px;
      border-color: ${Colors.border};
    `;
  }}
`;

export const MessageText = styled.Text<{ isUser: boolean }>`
  color: ${({ isUser }) => (isUser ? Colors.white : Colors.text)};
  font-size: 15px;
  line-height: 21px;
`;

export const FAQContainer = styled.View`
  padding-horizontal: 16px;
  padding-bottom: 8px;
`;

export const FAQButton = styled.TouchableOpacity`
  background-color: ${Colors.surface};
  padding: 14px;
  border-radius: 10px;
  margin-vertical: 6px;
  border-width: 1px;
  border-color: ${Colors.border};
`;

export const FAQText = styled.Text`
  font-size: 14px;
  color: ${Colors.text};
  font-weight: 500;
`;

export const HumanChatButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 16px;
  background-color: ${Colors.primary};
  padding-vertical: 14px;
  border-radius: 12px;
`;

export const HumanChatText = styled.Text`
  color: ${Colors.white};
  font-weight: 600;
  margin-left: 8px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  padding: 12px;
  background-color: ${Colors.surface};
  border-top-width: 1px;
  border-color: ${Colors.border};
`;

export const TextInputStyled = styled.TextInput`
  flex: 1;
  background-color: ${Colors.background};
  border-radius: 20px;
  padding-horizontal: 16px;
  font-size: 16px;
  color: ${Colors.text};
`;

export const SendButton = styled.TouchableOpacity`
  margin-left: 10px;
  background-color: ${Colors.primary};
  padding: 14px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;
