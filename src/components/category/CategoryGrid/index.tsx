import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useTheme } from "@emotion/react";

import { AppText, SkeletonLoader } from "@/shared/components";
import { Radius } from "@/theme/radius";

import GridCard from "../CategoryGridCard";
import { GRID_CARD_HEIGHT } from "../CategoryGridCard/types";

import { GRID_COLUMNS, GRID_SKELETON_COUNT, CategoryGridProps } from "./types";
import * as S from "./styles";

export default function CategoryGrid({
  categories,
  loading = false,
  onCategoryPress,
}: CategoryGridProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const cardWidth = useMemo(() => {
    const horizontalPadding = theme.spacing.lg * 2;
    const totalGap = theme.spacing.md * (GRID_COLUMNS - 1);

    return (width - horizontalPadding - totalGap) / GRID_COLUMNS;
  }, [theme.spacing.lg, theme.spacing.md, width]);

  if (loading) {
    return (
      <S.Container>
        <S.SkeletonGrid>
          {Array.from({ length: GRID_SKELETON_COUNT }).map((_, index) => (
            <SkeletonLoader
              key={`category-grid-skeleton-${index}`}
              width={cardWidth}
              height={GRID_CARD_HEIGHT}
              radius={Radius.lg}
            />
          ))}
        </S.SkeletonGrid>
      </S.Container>
    );
  }

  if (!categories.length) {
    return (
      <S.EmptyState>
        <AppText variant="title" weight="semibold" align="center">
          No categories found
        </AppText>
        <AppText variant="body" color="textSecondary" align="center">
          Try searching with a different keyword.
        </AppText>
      </S.EmptyState>
    );
  }

  return (
    <S.Container>
      <S.Grid>
        {categories.map((category) => (
          <GridCard
            key={category.slug}
            category={category}
            width={cardWidth}
            onPress={onCategoryPress}
          />
        ))}
      </S.Grid>
    </S.Container>
  );
}
