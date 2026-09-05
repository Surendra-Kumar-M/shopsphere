import { Bell, ScanLine } from "lucide-react-native";

import { Avatar, AppText, Button } from "@/shared/components";


import { GreetingHeaderProps } from "./types";

import * as S from "./styles";
import { getGreeting } from "@/utils/getGreeting.utils";

export default function GreetingHeader({
  userName,

  avatar,

  notificationCount,

  onAvatarPress,

  onNotificationPress,

  onScanPress,
}: GreetingHeaderProps) {
    const greeting = getGreeting();
  return (
    <S.Container>
      <S.LeftContainer>
        <Avatar
          uri={avatar}
          name={userName}
          size="lg"
          onPress={onAvatarPress}
        />

        <S.UserInfo>
          <AppText variant="bodySmall" color="textSecondary">
            {greeting}
          </AppText>

          <AppText variant="title" weight="bold">
            {userName}
          </AppText>
        </S.UserInfo>
      </S.LeftContainer>

      <S.RightContainer>
        <Button icon={ScanLine} variant="ghost" onPress={onScanPress} />
        <Button icon={Bell} variant="ghost" onPress={onNotificationPress} />
      </S.RightContainer>
    </S.Container>
  );
}
