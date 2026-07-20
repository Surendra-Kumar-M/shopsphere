import { FlatList } from "react-native";
import { useTheme } from "@emotion/react";

import { SkeletonLoader } from "@/components/ui";
import { Radius } from "@/theme/radius";

import SectionHeader from "../SectionHeader";
import CategoryCard from "../CategoryCard";

import { CATEGORY_CARD_SIZE, CategoryCardProps } from "../CategoryCard/types";

import { CATEGORY_SKELETON_COUNT, CategorySectionProps } from "./types";

import * as S from "./styles";

export default function CategorySection({
  title = "Categories",
  categories,
  selectedCategorySlug,
  loading = false,
  onCategoryPress,
  onSeeAllPress,
}: CategorySectionProps) {
  const theme = useTheme();

  if (loading) {
    return (
      <S.Container>
        <SectionHeader title={title} />

        <FlatList
          horizontal
          data={Array.from({ length: CATEGORY_SKELETON_COUNT })}
          keyExtractor={(_, index) => `category-skeleton-${index}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: theme.spacing.lg }}
          renderItem={() => (
            <S.SkeletonCard>
              <SkeletonLoader
                width={CATEGORY_CARD_SIZE - 16}
                height={CATEGORY_CARD_SIZE - 16}
                radius={Radius.lg}
              />
              <SkeletonLoader width={56} height={12} radius={Radius.sm} />
            </S.SkeletonCard>
          )}
        />
      </S.Container>
    );
  }

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
        contentContainerStyle={{ paddingRight: theme.spacing.lg }}
        renderItem={({ item }: { item: CategoryCardProps["category"] }) => (
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
