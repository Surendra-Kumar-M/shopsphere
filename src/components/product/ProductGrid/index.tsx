import { useCallback, useMemo } from "react";
import { FlatList, ListRenderItem, useWindowDimensions } from "react-native";
import { useTheme } from "@emotion/react";

import { AppText, SkeletonLoader, Spinner } from "@/shared/components";
import { Radius } from "@/theme/radius";

import { Product } from "@/models/Product";

import ProductCard from "../ProductCard";
import { PRODUCT_IMAGE_HEIGHT } from "../ProductCard/types";

import {
  PRODUCT_GRID_COLUMNS,
  PRODUCT_GRID_SKELETON_COUNT,
  ProductGridProps,
} from "./types";
import * as S from "./styles";

export default function ProductGrid({
  products,
  loading = false,
  loadingMore = false,
  wishlistedIds = [],
  onProductPress,
  onWishlistPress,
  onAddToCartPress,
  onEndReached,
}: ProductGridProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const cardWidth = useMemo(() => {
    const horizontalPadding = theme.spacing.lg * 2;
    const totalGap = theme.spacing.md * (PRODUCT_GRID_COLUMNS - 1);

    return (width - horizontalPadding - totalGap) / PRODUCT_GRID_COLUMNS;
  }, [theme.spacing.lg, theme.spacing.md, width]);

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <ProductCard
        product={item}
        width={cardWidth}
        isWishlisted={wishlistedIds.includes(item.id)}
        onPress={onProductPress}
        onWishlistPress={onWishlistPress}
        onAddToCartPress={onAddToCartPress}
      />
    ),
    [
      cardWidth,
      wishlistedIds,
      onProductPress,
      onWishlistPress,
      onAddToCartPress,
    ],
  );

  const keyExtractor = useCallback(
    (item: Product) => item.id.toString(),
    [],
  );

  if (loading) {
    return (
      <S.ColumnWrapper style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.md }}>
        {Array.from({ length: PRODUCT_GRID_SKELETON_COUNT }).map((_, index) => (
          <SkeletonLoader
            key={`product-grid-skeleton-${index}`}
            width={cardWidth}
            height={PRODUCT_IMAGE_HEIGHT + 120}
            radius={Radius.lg}
          />
        ))}
      </S.ColumnWrapper>
    );
  }

  if (!products.length) {
    return (
      <S.EmptyState>
        <AppText variant="title" weight="semibold" align="center">
          No products found
        </AppText>
        <AppText variant="body" color="textSecondary" align="center">
          Try adjusting your search or check back later.
        </AppText>
      </S.EmptyState>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={keyExtractor}
      numColumns={PRODUCT_GRID_COLUMNS}
      scrollEnabled={false}
      columnWrapperStyle={{
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
      }}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      ListFooterComponent={
        loadingMore ? (
          <S.Footer>
            <Spinner size="sm" />
          </S.Footer>
        ) : null
      }
    />
  );
}
