import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SendHorizontal, Headset } from "lucide-react-native";
import io, { Socket } from "socket.io-client";

import { getBotReply } from "@/utils/chatbotLogic";
import { Colors } from "@/theme/colors";

import * as S from "./styles";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "agent";
  room?: string;
}

const FAQ_OPTIONS = [
  "Where is my order?",
  "How do I return a product?",
  "Payment issues",
  "Contact support",
];

const SOCKET_SERVER_URL =
  process.env.EXPO_PUBLIC_SOCKET_SERVER_URL ;

export default function ChatScreen() {
  const inset = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const socketRef = useRef<Socket | null>(null);
  const roomRef = useRef(`room-${Date.now()}`);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi 👋 I'm your ShopSphere assistant. Choose a topic below to get started.",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");
  const [isHumanChat, setIsHumanChat] = useState(false);
  const [botInteracted, setBotInteracted] = useState(false);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  /* ---------------- SOCKET CONNECTION ---------------- */
  useEffect(() => {
    if (!isHumanChat) return;

    if (!socketRef.current) {
      socketRef.current = io(SOCKET_SERVER_URL);

      socketRef.current.on("connect", () => {
        console.log("Connected:", socketRef.current?.id);
        socketRef.current?.emit("join_room", roomRef.current, {
          name: `Mobile App User (${roomRef.current.slice(-4)})`,
        });
      });

      socketRef.current.on("receive_message", (data: Message) => {
        setMessages((prev) => {
          const exists = prev.find((msg) => msg.id === data.id);
          if (exists) return prev;
          return [...prev, data];
        });
      });
    }

    return () => {
      socketRef.current?.off("receive_message");
    };
  }, [isHumanChat]);

  /* ---------------- BOT FLOW ---------------- */
  const onFaqPress = (question: string) => {
    setBotInteracted(true);

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: question, sender: "user" },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          text: getBotReply(question),
          sender: "bot",
        },
      ]);
    }, 600);
  };

  /* ---------------- ENABLE HUMAN CHAT ---------------- */
  const enableHumanChat = () => {
    setIsHumanChat(true);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "👩‍💼 Connecting you to a support agent...",
        sender: "bot",
      },
    ]);
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;

    const msg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      room: roomRef.current,
    };

    setMessages((prev) => [...prev, msg]);
    socketRef.current.emit("send_message", msg);
    setInput("");
  };

  /* ---------------- RENDER MESSAGE ---------------- */
  const renderItem = ({ item }: { item: Message }) => (
    <S.MessageBubble sender={item.sender}>
      <S.MessageText isUser={item.sender === "user"}>
        {item.text}
      </S.MessageText>
    </S.MessageBubble>
  );

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
        backgroundColor: Colors.background,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      />

      {!isHumanChat && (
        <S.FAQContainer>
          {FAQ_OPTIONS.map((item) => (
            <S.FAQButton key={item} onPress={() => onFaqPress(item)}>
              <S.FAQText>{item}</S.FAQText>
            </S.FAQButton>
          ))}
        </S.FAQContainer>
      )}

      {!isHumanChat && botInteracted && (
        <S.HumanChatButton onPress={enableHumanChat}>
          <Headset size={16} color={Colors.white} />
          <S.HumanChatText>Chat with a real person</S.HumanChatText>
        </S.HumanChatButton>
      )}

      {isHumanChat && (
        <S.InputContainer>
          <S.TextInputStyled
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            placeholderTextColor={Colors.textMuted}
          />
          <S.SendButton onPress={sendMessage}>
            <SendHorizontal size={18} color={Colors.white} />
          </S.SendButton>
        </S.InputContainer>
      )}
    </KeyboardAvoidingView>
  );
}
