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

/* ---------------- HEADER ---------------- */
export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  background-color: ${Colors.surface};
  border-bottom-width: 1px;
  border-color: ${Colors.border};
`;

export const HeaderInfo = styled.View`
  flex: 1;
`;

export const HeaderTitle = styled.Text`
  font-size: 17px;
  fontWeight: 700;
  color: ${Colors.text};
`;

export const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
`;

export const StatusDot = styled.View<{ statusColor?: string }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 6px;
  background-color: ${({ statusColor }) => statusColor || Colors.success};
`;

export const StatusLabel = styled.Text`
  font-size: 12px;
  color: ${Colors.textSecondary};
  font-weight: 500;
`;

export const HeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const IconBtn = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 20px;
  background-color: ${Colors.background};
`;

/* ---------------- MESSAGE BUBBLES ---------------- */
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
        background-color: #E0E7FF;
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

export const SenderTag = styled.Text<{ isUser: boolean }>`
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ isUser }) => (isUser ? "#E0E7FF" : Colors.primary)};
`;

/* ---------------- TYPING INDICATOR ---------------- */
export const TypingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  padding-vertical: 6px;
  background-color: ${Colors.background};
`;

export const TypingText = styled.Text`
  font-size: 12px;
  color: ${Colors.textSecondary};
  font-style: italic;
  margin-left: 6px;
`;

/* ---------------- FAQ ---------------- */
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

/* ---------------- HUMAN CHAT TOGGLE ---------------- */
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

/* ---------------- INPUT ---------------- */
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

/* ---------------- MODAL SETTINGS ---------------- */
export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ModalCard = styled.View`
  width: 100%;
  background-color: ${Colors.surface};
  border-radius: 16px;
  padding: 20px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.text};
  margin-bottom: 4px;
`;

export const ModalSubtitle = styled.Text`
  font-size: 12px;
  color: ${Colors.textSecondary};
  margin-bottom: 14px;
`;

export const PresetItem = styled.TouchableOpacity<{ isSelected?: boolean }>`
  padding: 10px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ isSelected }) => (isSelected ? Colors.primary : Colors.border)};
  background-color: ${({ isSelected }) => (isSelected ? "#EEF2FF" : Colors.background)};
  margin-bottom: 8px;
`;

export const PresetName = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${Colors.text};
`;

export const PresetDetail = styled.Text`
  font-size: 11px;
  color: ${Colors.textMuted};
  margin-top: 2px;
`;

export const CustomLabel = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${Colors.text};
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const CustomInput = styled.TextInput`
  border-width: 1px;
  border-color: ${Colors.border};
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  color: ${Colors.text};
  background-color: ${Colors.background};
  margin-bottom: 14px;
`;

export const ModalActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
`;

export const CloseBtn = styled.TouchableOpacity`
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 8px;
  background-color: ${Colors.background};
`;

export const CloseBtnText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${Colors.text};
`;

export const SaveBtn = styled.TouchableOpacity`
  padding-vertical: 8px;
  padding-horizontal: 18px;
  border-radius: 8px;
  background-color: ${Colors.primary};
`;

export const SaveBtnText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${Colors.white};
`;
