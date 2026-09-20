import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SendHorizontal, Headset, Settings2, RefreshCw } from "lucide-react-native";
import { io, Socket } from "socket.io-client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

import { getBotReply } from "@/utils/chatbotLogic";
import { Colors } from "@/theme/colors";

import * as S from "./styles";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "agent";
  room?: string;
  timestamp?: number;
}

const FAQ_OPTIONS = [
  "Where is my order?",
  "How do I return a product?",
  "Payment issues",
  "Contact support",
];

const STORAGE_KEY = "@shopsphere_socket_server_url";

/**
 * Determine best default chat server URL based on runtime environment.
 * Auto-detects the developer PC IP from Expo Metro hostUri for mobile devices.
 */
function getDefaultServerUrl(): string {
  // Web browser environment
  if (Platform.OS === "web") {
    return "http://localhost:3000";
  }

  // Mobile Expo (Android / iOS) - extracts host IP from Metro bundler
  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants as any).manifest2?.extra?.expoGo?.debuggerHost;

  if (hostUri) {
    const host = hostUri.split(":")[0];
    return `http://${host}:3000`;
  }

  // Android Emulator fallback
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000";
  }

  return "http://localhost:3000";
}

export default function ChatScreen() {
  const inset = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const [roomId] = useState<string>(() => `room-${Date.now()}`);
  const [serverUrl, setServerUrl] = useState<string>(getDefaultServerUrl);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [, setConnectionError] = useState<string | null>(null);

  const [isHumanChat, setIsHumanChat] = useState(false);
  const [, setBotInteracted] = useState(false);
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const [input, setInput] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState("");

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "1",
      text: "Hi 👋 I'm your ShopSphere assistant. You can choose a FAQ topic or tap 'Chat with a real person' to connect with our support team live.",
      sender: "bot",
      timestamp: Date.now(),
    },
  ]);


  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages, isAgentTyping]);

  /* ---------------- LOAD SAVED SERVER URL ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && saved.trim()) {
          setServerUrl(saved.trim());
          setCustomUrlInput(saved.trim());
        } else {
          setCustomUrlInput(getDefaultServerUrl());
        }
      } catch (err) {
        console.warn("Failed to read saved socket URL:", err);
      }
    })();
  }, []);

  /* ---------------- SOCKET CONNECTION LIFECYCLE ---------------- */
  const initSocket = useCallback((urlToConnect: string) => {
    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    console.log("[ChatScreen] Connecting to Socket Server:", urlToConnect);

    const socket = io(urlToConnect, {
      transports: ["websocket", "polling"],
      timeout: 10000,
      reconnectionAttempts: 8,
      reconnectionDelay: 1200,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[ChatScreen] Connected to server, socket ID:", socket.id);
      setIsConnected(true);
      setIsConnecting(false);
      setConnectionError(null);

      // If user was already in human chat, re-join room
      if (isHumanChat) {
        socket.emit("join_room", roomId, {
          name: `Mobile Customer (${roomId.slice(-4)})`,
        });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("[ChatScreen] Disconnected:", reason);
      setIsConnected(false);
      setIsConnecting(false);
    });

    socket.on("connect_error", (err) => {
      console.warn("[ChatScreen] Connection error:", err.message);
      setIsConnected(false);
      setIsConnecting(false);
      setConnectionError(err.message);
    });

    socket.on("receive_message", (data: Message) => {
      console.log("[ChatScreen] receive_message:", data);
      if (data.room && data.room !== roomId) return;

      setMessages((prev) => {
        if (prev.some((m) => m.id === data.id)) return prev;
        return [...prev, data];
      });
    });

    socket.on("user_typing", (data: { room: string; sender: string; isTyping: boolean }) => {
      if (data.room === roomId && data.sender === "agent") {
        setIsAgentTyping(data.isTyping);
      }
    });

    socket.on("room_history", (history: Message[]) => {
      if (Array.isArray(history) && history.length > 0) {
        setMessages((prev) => {
          const map = new Map<string, Message>();
          prev.forEach((m) => map.set(m.id, m));
          history.forEach((m) => map.set(m.id, m));
          return Array.from(map.values()).sort(
            (a, b) => (a.timestamp || 0) - (b.timestamp || 0)
          );
        });
      }
    });
  }, [roomId, isHumanChat]);

  // Connect socket immediately on mount and when serverUrl changes
  useEffect(() => {
    initSocket(serverUrl);

    return () => {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [serverUrl, initSocket]);

  /* ---------------- ENABLE HUMAN LIVE CHAT ---------------- */
  const enableHumanChat = () => {
    setIsHumanChat(true);

    const connectMsg: Message = {
      id: Date.now().toString(),
      text: "👩‍💼 Connecting you to a live support agent...",
      sender: "bot",
      room: roomId,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, connectMsg]);

    const socket = socketRef.current;
    if (socket && socket.connected) {
      socket.emit("join_room", roomId, {
        name: `Mobile Customer (${roomId.slice(-4)})`,
      });
      socket.emit("send_message", connectMsg);
    } else if (socket) {
      // If socket is still connecting, join room once connected
      socket.once("connect", () => {
        socket.emit("join_room", roomId, {
          name: `Mobile Customer (${roomId.slice(-4)})`,
        });
        socket.emit("send_message", connectMsg);
      });
    }
  };

  /* ---------------- FAQ BOT SELECTION ---------------- */
  const onFaqPress = (question: string) => {
    setBotInteracted(true);

    const userMsg: Message = {
      // eslint-disable-next-line react-hooks/purity -- Date.now() is in an event handler, not render
      id: Date.now().toString(),
      text: question,
      sender: "user",
      // eslint-disable-next-line react-hooks/purity -- timestamp generated on user action
      timestamp: Date.now(),
    };


    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotReply(question),
        sender: "bot",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  /* ---------------- INPUT AND TYPING ---------------- */
  const handleInputChange = (text: string) => {
    setInput(text);

    if (socketRef.current && isHumanChat) {
      socketRef.current.emit("typing", {
        room: roomId,
        sender: "user",
        isTyping: true,
      });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current?.emit("typing", {
          room: roomId,
          sender: "user",
          isTyping: false,
        });
      }, 1500);
    }
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    const textToSend = input.trim();
    if (!textToSend) return;

    if (socketRef.current) {
      socketRef.current.emit("typing", {
        room: roomId,
        sender: "user",
        isTyping: false,
      });
    }

    setInput("");

    if (isHumanChat) {
      const msg: Message = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        text: textToSend,
        sender: "user",
        room: roomId,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, msg]);

      if (socketRef.current) {
        socketRef.current.emit("send_message", msg);
      }
    } else {
      // Local Bot FAQ flow
      const userMsg: Message = {
        id: Date.now().toString(),
        text: textToSend,
        sender: "user",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setBotInteracted(true);

      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotReply(textToSend),
          sender: "bot",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, reply]);
      }, 500);
    }
  };

  /* ---------------- SERVER URL SWITCHER ---------------- */
  const handleSelectServerUrl = async (newUrl: string) => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    setServerUrl(trimmed);
    setCustomUrlInput(trimmed);
    setIsSettingsOpen(false);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, trimmed);
    } catch (err) {
      console.warn("Failed to persist socket URL:", err);
    }
  };

  /* ---------------- RENDER MESSAGE ITEM ---------------- */
  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";
    const isAgent = item.sender === "agent";

    return (
      <S.MessageBubble sender={item.sender}>
        {isAgent && <S.SenderTag isUser={false}>Support Agent</S.SenderTag>}
        {item.sender === "bot" && <S.SenderTag isUser={false}>ShopSphere Assistant</S.SenderTag>}
        <S.MessageText isUser={isUser}>{item.text}</S.MessageText>
      </S.MessageBubble>
    );
  };

  const statusColor = isConnected
    ? Colors.success
    : isConnecting
    ? Colors.warning
    : Colors.danger;

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
      {/* Real-time Header */}
      <S.Header>
        <S.HeaderInfo>
          <S.HeaderTitle>ShopSphere Support</S.HeaderTitle>
          <S.StatusRow>
            <S.StatusDot statusColor={statusColor} />
            <S.StatusLabel numberOfLines={1}>
              {isConnected
                ? isHumanChat
                  ? "Live Agent Online"
                  : "Connected to Server"
                : isConnecting
                ? "Connecting..."
                : "Offline (Tap ⚙️ to change server)"}
            </S.StatusLabel>
          </S.StatusRow>
        </S.HeaderInfo>

        <S.HeaderActions>
          <S.IconBtn onPress={() => initSocket(serverUrl)} activeOpacity={0.7}>
            <RefreshCw size={17} color={Colors.textSecondary} />
          </S.IconBtn>
          <S.IconBtn onPress={() => setIsSettingsOpen(true)} activeOpacity={0.7}>
            <Settings2 size={18} color={Colors.textSecondary} />
          </S.IconBtn>
        </S.HeaderActions>
      </S.Header>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      />

      {/* Agent Typing Indicator */}
      {isAgentTyping && (
        <S.TypingContainer>
          <Headset size={14} color={Colors.primary} />
          <S.TypingText>Support Agent is typing...</S.TypingText>
        </S.TypingContainer>
      )}

      {/* FAQ Buttons (Visible before Human Chat) */}
      {!isHumanChat && (
        <S.FAQContainer>
          {FAQ_OPTIONS.map((item) => (
            <S.FAQButton key={item} onPress={() => onFaqPress(item)}>
              <S.FAQText>{item}</S.FAQText>
            </S.FAQButton>
          ))}
        </S.FAQContainer>
      )}

      {/* Chat With Live Agent Button */}
      {!isHumanChat && (
        <S.HumanChatButton onPress={enableHumanChat}>
          <Headset size={16} color={Colors.white} />
          <S.HumanChatText>Chat with a real person</S.HumanChatText>
        </S.HumanChatButton>
      )}

      {/* Input Container */}
      <S.InputContainer>
        <S.TextInputStyled
          value={input}
          onChangeText={handleInputChange}
          placeholder={isHumanChat ? "Message live support agent..." : "Type your question..."}
          placeholderTextColor={Colors.textMuted}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <S.SendButton onPress={sendMessage}>
          <SendHorizontal size={18} color={Colors.white} />
        </S.SendButton>
      </S.InputContainer>

      {/* Server Settings Modal */}
      <Modal
        visible={isSettingsOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSettingsOpen(false)}
      >
        <S.ModalOverlay>
          <S.ModalCard>
            <S.ModalTitle>Chat Server Setup</S.ModalTitle>
            <S.ModalSubtitle>Current: {serverUrl}</S.ModalSubtitle>

            {/* Presets */}
            <S.PresetItem
              isSelected={serverUrl.includes("localhost:3000")}
              onPress={() => handleSelectServerUrl("http://localhost:3000")}
            >
              <S.PresetName>Local Server (Web / iOS)</S.PresetName>
              <S.PresetDetail>http://localhost:3000</S.PresetDetail>
            </S.PresetItem>

            <S.PresetItem
              isSelected={serverUrl.includes("10.0.2.2:3000")}
              onPress={() => handleSelectServerUrl("http://10.0.2.2:3000")}
            >
              <S.PresetName>Local Server (Android Emulator)</S.PresetName>
              <S.PresetDetail>http://10.0.2.2:3000</S.PresetDetail>
            </S.PresetItem>

            <S.PresetItem
              isSelected={serverUrl.includes("192.168.1.10:3000")}
              onPress={() => handleSelectServerUrl("http://192.168.1.10:3000")}
            >
              <S.PresetName>Local Server (Physical Phone on Wi-Fi)</S.PresetName>
              <S.PresetDetail>http://192.168.1.10:3000</S.PresetDetail>
            </S.PresetItem>

            <S.PresetItem
              isSelected={serverUrl.includes("onrender.com")}
              onPress={() => handleSelectServerUrl("https://shopsphere-chat-server.onrender.com")}
            >
              <S.PresetName>Render Cloud Server (Production)</S.PresetName>
              <S.PresetDetail>https://shopsphere-chat-server.onrender.com</S.PresetDetail>
            </S.PresetItem>

            {/* Custom Input */}
            <S.CustomLabel>Or Custom Server URL:</S.CustomLabel>
            <S.CustomInput
              value={customUrlInput}
              onChangeText={setCustomUrlInput}
              placeholder="http://192.168.x.x:3000"
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <S.ModalActions>
              <S.CloseBtn onPress={() => setIsSettingsOpen(false)}>
                <S.CloseBtnText>Cancel</S.CloseBtnText>
              </S.CloseBtn>

              <S.SaveBtn onPress={() => handleSelectServerUrl(customUrlInput)}>
                <S.SaveBtnText>Connect</S.SaveBtnText>
              </S.SaveBtn>
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalOverlay>
      </Modal>
    </KeyboardAvoidingView>
  );
}
