import { RefreshControl, ScrollView } from "react-native";
import { Star } from "lucide-react-native";
import { useTheme } from "@emotion/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ProductDetailHeader,
  ProductDetailSkeleton,
  ProductGallery,
  ProductPrice,
  ProductReviews,
  ProductSection,
  ProductSpecs,
} from "@/components/product";

import { AppText, Badge, Button, Divider, Screen } from "@/shared/components";

import { useProduct } from "@/hooks/useProduct";

import {
  getAverageReviewRating,
  getStockBadgeVariant,
  getStockLabel,
} from "@/utils/product.utils";

import * as S from "./styles";

interface ProductScreenProps {
  productId: number;
}

export default function ProductScreen({ productId }: ProductScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const {
    product,
    images,
    selectedImageIndex,
    relatedProducts,
    pricing,
    isWishlisted,
    inCart,
    isOutOfStock,
    loading,
    refreshing,
    relatedLoading,
    error,
    refetch,
    handleSelectImage,
    handleBack,
    handleShare,
    handleToggleWishlist,
    handleAddToCart,
    handleBuyNow,
    handleRelatedProductPress,
    handleRelatedWishlistPress,
    handleRelatedAddToCartPress,
    wishlistedIds,
  } = useProduct(productId);

  if (loading) {
    return (
      <Screen safeArea padding={false} scrollable={false}>
        <ProductDetailSkeleton />
      </Screen>
    );
  }

  if (error || !product || !pricing) {
    return (
      <Screen safeArea padding={false} scrollable={false}>
        <S.ErrorContainer>
          <AppText variant="title" weight="bold" align="center">
            Product unavailable
          </AppText>
          <AppText variant="body" color="textSecondary" align="center">
            We could not load this product right now.
          </AppText>
          <Button title="Retry" onPress={refetch} />
          <Button title="Go Back" variant="outline" onPress={handleBack} />
        </S.ErrorContainer>
      </Screen>
    );
  }

  const averageReviewRating = getAverageReviewRating(
    product.reviews,
    product.rating,
  );

  const stockLabel = getStockLabel(product.stock);
  const stockBadgeVariant = getStockBadgeVariant(product.stock);

  return (
    <Screen safeArea={false} padding={false} scrollable={false}>
      <S.Layout>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetch} />
          }
          contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}>
          <S.GalleryWrapper>
            <ProductDetailHeader
              onBackPress={handleBack}
              onSharePress={handleShare}
              onWishlistPress={handleToggleWishlist}
              isWishlisted={isWishlisted}
            />

            <ProductGallery
              images={images}
              selectedIndex={selectedImageIndex}
              onSelectImage={handleSelectImage}
            />
          </S.GalleryWrapper>

          <S.Content>
            <S.Section>
              <S.MetaRow>
                {product.brand ? (
                  <Badge label={product.brand} variant="featured" size="sm" />
                ) : null}
                <Badge label={stockLabel} variant={stockBadgeVariant} size="sm" />
              </S.MetaRow>

              <AppText variant="h1" weight="bold">
                {product.title}
              </AppText>

              <S.RatingRow>
                <Star
                  size={16}
                  color={theme.colors.warning}
                  fill={theme.colors.warning}
                />
                <AppText variant="bodySmall" color="textSecondary">
                  {product.rating.toFixed(1)} rating
                  {product.reviews?.length
                    ? ` · ${product.reviews.length} reviews`
                    : ""}
                </AppText>
              </S.RatingRow>

              <ProductPrice
                formattedSalePrice={pricing.formattedSalePrice}
                formattedOriginalPrice={pricing.formattedOriginalPrice}
                hasDiscount={pricing.hasDiscount}
                discountLabel={pricing.discountLabel}
              />
            </S.Section>

            <Divider />

            <S.Section>
              <AppText variant="title" weight="bold">
                Description
              </AppText>
              <AppText variant="body" color="textSecondary">
                {product.description}
              </AppText>
            </S.Section>

            <ProductSpecs product={product} />

            <ProductReviews
              reviews={product.reviews ?? []}
              averageRating={averageReviewRating}
            />

            <ProductSection
              title="You may also like"
              products={relatedProducts}
              loading={relatedLoading}
              wishlistedIds={wishlistedIds}
              onProductPress={handleRelatedProductPress}
              onWishlistPress={handleRelatedWishlistPress}
              onAddToCartPress={handleRelatedAddToCartPress}
            />
          </S.Content>
        </ScrollView>

        <S.BottomBar style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
          <S.BottomAction>
            <Button
              title={inCart ? "Added to Cart" : "Add to Cart"}
              variant={inCart ? "secondary" : "outline"}
              fullWidth
              disabled={isOutOfStock}
              onPress={handleAddToCart}
            />
          </S.BottomAction>

          <S.BottomAction>
            <Button
              title="Buy Now"
              fullWidth
              disabled={isOutOfStock}
              onPress={handleBuyNow}
            />
          </S.BottomAction>
        </S.BottomBar>
      </S.Layout>
    </Screen>
  );
}
