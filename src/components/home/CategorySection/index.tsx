import { FlatList } from "react-native";

import SectionHeader from "../SectionHeader";
import CategoryCard from "../CategoryCard";

import { CategorySectionProps } from "./types";

import * as S from "./styles";

export default function CategorySection({
  title = "Categories",
  categories,
  selectedCategorySlug,
  onCategoryPress,
  onSeeAllPress,
}: CategorySectionProps) {
  return (
    <S.Container>
      <SectionHeader
        title={title}
        actionText="See All"
        onActionPress={onSeeAllPress}
      />

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.slug}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 16,
        }}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            selected={selectedCategorySlug === item.slug}
            onPress={() => onCategoryPress?.(item)}
          />
        )}
      />
    </S.Container>
  );
}
