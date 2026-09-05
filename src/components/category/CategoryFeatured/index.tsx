import { ScrollView } from "react-native";
import { useTheme } from "@emotion/react";

import { AppText } from "@/shared/components";

import { CategoryFeaturedCard } from "../CategoryGridCard";

import { CategoryFeaturedProps } from "./types";
import * as S from "./styles";

export default function CategoryFeatured({
  categories,
  onCategoryPress,
}: CategoryFeaturedProps) {
  const theme = useTheme();

  if (!categories.length) {
    return null;
  }

  return (
    <S.Container>
      <AppText variant="title" weight="bold">
        Featured
      </AppText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: theme.spacing.lg }}>
        <S.ListContent>
          {categories.map((category) => (
            <CategoryFeaturedCard
              key={category.slug}
              category={category}
              onPress={onCategoryPress}
            />
          ))}
        </S.ListContent>
      </ScrollView>
    </S.Container>
  );
}
