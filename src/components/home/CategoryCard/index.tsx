import { AppText } from "@/components/ui";

import * as S from "./styles";

import { CategoryCardProps } from "./types";

export default function CategoryCard({
  category,
  selected = false,
  onPress,
}: CategoryCardProps) {
  return (
    <S.Container selected={selected} onPress={onPress}>
      <S.IconWrapper selected={selected}>
        <S.CategoryImage source={{ uri: category.image }} contentFit="contain" />
      </S.IconWrapper>

      <S.NameContainer>
        <AppText
          variant="caption"
          weight={selected ? "bold" : "medium"}
          color={selected ? "primary" : "text"}
          numberOfLines={1}>
          {category.name}
        </AppText>
      </S.NameContainer>
    </S.Container>
  );
}
