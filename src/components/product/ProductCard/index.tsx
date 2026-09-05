import { memo } from "react";

import { Star, ShoppingCart, Heart } from "lucide-react-native";
import { useTheme } from "@emotion/react";

import { AppText, Badge, Button, Icon } from "@/shared/components";

import { ProductCardProps } from "./types";
import * as S from "./styles";

function ProductCard({
  product,
  width,
  isWishlisted = false,
  onPress,
  onWishlistPress,
  onAddToCartPress,
}: ProductCardProps) {
  const theme = useTheme();

  const { title, thumbnail, price, rating, discountPercentage } = product;

  const hasDiscount = discountPercentage > 0;

  const discountLabel = `${Math.round(discountPercentage)}% OFF`;

  const formattedPrice = `$${price.toFixed(2)}`;

  const handlePress = () => {
    onPress?.(product);
  };

  const handleAddToCart = () => {
    onAddToCartPress?.(product);
  };

  const handleWishlist = () => {
    onWishlistPress?.(product);
  };

  return (
    <S.Container width={width} onPress={handlePress} accessibilityRole="button">
      <S.ImageContainer>
        <S.WishlistButton
          onPress={handleWishlist}
          accessibilityRole="button"
          accessibilityLabel={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }>
          <Icon
            icon={Heart}
            size={20}
            color={isWishlisted ? "danger" : "textSecondary"}
          />
        </S.WishlistButton>

        <S.ProductImage source={{ uri: thumbnail }} contentFit="contain" />
      </S.ImageContainer>

      <S.Content>
        {hasDiscount ? <Badge label={discountLabel} variant="sale" /> : null}

        <AppText variant="body" weight="semibold" numberOfLines={1}>
          {title}
        </AppText>

        <S.RatingRow>
          <Star
            size={14}
            color={theme.colors.warning}
            fill={theme.colors.warning}
          />

          <AppText variant="caption" color="textSecondary">
            {rating.toFixed(1)}
          </AppText>
        </S.RatingRow>

        <S.PriceRow>
          <AppText variant="title" weight="bold" color="primary">
            {formattedPrice}
          </AppText>

          <Button
            icon={ShoppingCart}
            size="sm"
            onPress={handleAddToCart}
            accessibilityLabel="Add to cart"
          />
        </S.PriceRow>
      </S.Content>
    </S.Container>
  );
}

export default memo(ProductCard);
