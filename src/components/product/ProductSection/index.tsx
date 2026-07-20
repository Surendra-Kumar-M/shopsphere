import { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { useTheme } from "@emotion/react";

import SectionHeader from "@/components/home/SectionHeader";
import { Spinner } from "@/components/ui";

import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";

import { Product } from "@/models/Product";

import { PRODUCT_SKELETON_COUNT, ProductSectionProps } from "./types";
import * as S from "./styles";

export default function ProductSection({
  title = "Popular Products",
  products,
  loading = false,
  loadingMore = false,
  wishlistedIds = [],
  onProductPress,
  onWishlistPress,
  onAddToCartPress,
  onSeeAllPress,
  onEndReached,
}: ProductSectionProps) {
  const theme = useTheme();

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <ProductCard
        product={item}
        isWishlisted={wishlistedIds.includes(item.id)}
        onPress={onProductPress}
        onWishlistPress={onWishlistPress}
        onAddToCartPress={onAddToCartPress}
      />
    ),
    [
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
      <S.Container>
        <SectionHeader title={title} />

        <FlatList
          horizontal
          data={Array.from({ length: PRODUCT_SKELETON_COUNT })}
          keyExtractor={(_, index) => `skeleton-${index}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: theme.spacing.lg }}
          renderItem={() => <ProductCardSkeleton />}
        />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <SectionHeader
        title={title}
        actionText="View All"
        onActionPress={onSeeAllPress}
      />

      <FlatList
        horizontal
        data={products}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: theme.spacing.lg }}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <S.ListContent>
              <Spinner size="sm" />
            </S.ListContent>
          ) : null
        }
      />
    </S.Container>
  );
}
