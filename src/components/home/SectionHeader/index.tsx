import { ChevronRight } from "lucide-react-native";

import { useTheme } from "@emotion/react";

import { AppText, Icon } from "@/components/ui";

import { SectionHeaderProps } from "./types";

import * as S from "./styles";

export default function SectionHeader({
  title,
  subtitle,
  actionText,
  actionIcon = ChevronRight,
  onActionPress,
}: SectionHeaderProps) {
  const theme = useTheme();

  const ActionIcon = actionIcon;

  return (
    <S.Container>
      <S.LeftContainer>
        <AppText variant="title" weight="bold">
          {title}
        </AppText>

        {subtitle && (
          <S.SubtitleContainer>
            <AppText variant="caption" color="textSecondary">
              {subtitle}
            </AppText>
          </S.SubtitleContainer>
        )}
      </S.LeftContainer>

      {actionText && (
        <S.RightContainer onPress={onActionPress}>
          <AppText variant="button" weight="semibold" color="primary">
            {actionText}
          </AppText>

          <Icon icon={ActionIcon} size={20} color="primary" />
        </S.RightContainer>
      )}
    </S.Container>
  );
}
