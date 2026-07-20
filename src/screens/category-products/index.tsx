import { useCallback, useMemo } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "@emotion/react";

import { SearchBar } from "@/components/home";
import { CategoryProductsHeader } from "@/components/category";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCT_GRID_COLUMNS } from "@/components/product/ProductGrid/types";

import { AppText, Button, Screen, SkeletonLoader, Spinner } from "@/components/ui";

import { useCategoryProducts } from "@/hooks/useCategoryProducts";

import { Product } from "@/models/Product";

import { Radius } from "@/theme/radius";

import * as S from "./styles";

interface CategoryProductsScreenProps {
  slug: string;
}

export default function CategoryProductsScreen({
  slug,
}: CategoryProductsScreenProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const {
    category,
    products,
    totalProducts,
    search,
    wishlistedIds,
    loading,
    loadingMore,
    refreshing,
    error,
    handleBack,
    handleSearch,
    handleProductPress,
    handleWishlistPress,
    handleAddToCart,
    handleLoadMore,
    refetch,
  } = useCategoryProducts(slug);

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
        onPress={handleProductPress}
        onWishlistPress={handleWishlistPress}
        onAddToCartPress={handleAddToCart}
      />
    ),
    [
      cardWidth,
      wishlistedIds,
      handleProductPress,
      handleWishlistPress,
      handleAddToCart,
    ],
  );

  const keyExtractor = useCallback(
    (item: Product) => item.id.toString(),
    [],
  );

  const listHeader = (
    <>
      <CategoryProductsHeader
        category={category}
        productCount={totalProducts}
        onBackPress={handleBack}
      />

      <S.SearchSection>
        <SearchBar
          value={search}
          onChangeText={handleSearch}
          placeholder="Search in this category..."
        />
      </S.SearchSection>

      <S.SectionHeading>
        <AppText variant="title" weight="bold">
          Products
        </AppText>
      </S.SectionHeading>
    </>
  );

  if (error && !loading && products.length === 0) {
    return (
      <Screen safeArea padding={false} scrollable={false}>
        <CategoryProductsHeader
          category={category}
          productCount={0}
          onBackPress={handleBack}
        />
        <S.ErrorContainer>
          <AppText variant="title" weight="bold" align="center">
            Could not load products
          </AppText>
          <AppText variant="body" color="textSecondary" align="center">
            Please try again.
          </AppText>
          <Button title="Retry" onPress={refetch} />
        </S.ErrorContainer>
      </Screen>
    );
  }

  if (loading) {
    return (
      <Screen safeArea={false} padding={false} scrollable={false}>
        {listHeader}
        <S.ListContent
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
          }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoader
              key={`category-product-skeleton-${index}`}
              width={cardWidth}
              height={280}
              radius={Radius.lg}
            />
          ))}
        </S.ListContent>
      </Screen>
    );
  }

  return (
    <Screen safeArea={false} padding={false} scrollable={false}>
      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        numColumns={PRODUCT_GRID_COLUMNS}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: theme.spacing.lg,
          marginBottom: theme.spacing.md,
        }}
        contentContainerStyle={{ paddingBottom: theme.spacing.xxxl }}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <S.ErrorContainer>
            <AppText variant="title" weight="semibold" align="center">
              No products found
            </AppText>
            <AppText variant="body" color="textSecondary" align="center">
              Try a different search term.
            </AppText>
          </S.ErrorContainer>
        }
        ListFooterComponent={
          loadingMore ? (
            <S.Footer>
              <Spinner size="sm" />
            </S.Footer>
          ) : null
        }
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refetch} />
        }
      />
    </Screen>
  );
}
