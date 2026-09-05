import { ArrowRight } from "lucide-react-native";

import { AppText, Button } from "@/shared/components";

import * as S from "./styles";

import { PromoBannerProps } from "./types";

export default function PromoBanner({
  title,

  subtitle,

  buttonText = "Shop Now",

  image,

  onPress,
}: PromoBannerProps) {
  return (
    <S.Container onPress={onPress}>
      <S.Content>
        <AppText variant="title" weight="bold" color="white">
          {title}
        </AppText>

        <AppText
          variant="body"
          color="white"
          style={{
            opacity: 0.85,
            marginTop: 8,
            marginBottom: 16,
          }}>
          {subtitle}
        </AppText>

        <Button
          title={buttonText}
          rightIcon={ArrowRight}
          variant="secondary"
          size="sm"
        />
      </S.Content>

      <S.ImageContainer>
        <S.BannerImage source={image} />
      </S.ImageContainer>
    </S.Container>
  );
}
