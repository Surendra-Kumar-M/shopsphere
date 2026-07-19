import { Star, ShoppingCart, Heart } from "lucide-react-native";
import { useTheme } from "@emotion/react";

import { AppText, Badge, Button, Icon } from "@/components/ui";

import { ProductCardProps } from "./types";
import * as S from "./styles";

export default function ProductCard({
  product,
isWishlisted,
  onPress,
  onWishlistPress,
  onAddToCartPress,
}: ProductCardProps) {
  const theme = useTheme();

  const { title, thumbnail, price, rating, discountPercentage } = product;

  const hasDiscount = discountPercentage > 0;

  const discountLabel = `${Math.round(discountPercentage)}% OFF`;

  const formattedPrice = `$${price}`;

  const handlePress = () => {
    onPress?.(product);
  };

  const handleAddToCart = () => {
    onAddToCartPress?.(product);
  };

  const handleWishlist = () => {
    onWishlistPress?.(product);
  };


  const heartColor = isWishlisted
    ? theme.colors.danger
    : theme.colors.textSecondary;

  const renderDiscountBadge = () => {
    if (!hasDiscount) return null;

    return <Badge label={discountLabel} variant="sale" />;
  };

  return (
    <S.Container onPress={handlePress}>
      <S.ImageContainer>
        <S.WishlistButton onPress={handleWishlist}>
          <Icon
            icon={Heart}
            size={20}
            color={isWishlisted ? "danger" : "textSecondary"}
          />
        </S.WishlistButton>

        <S.ProductImage source={{ uri: thumbnail }} contentFit="contain" />
      </S.ImageContainer>

      <S.Content>
        {renderDiscountBadge()}

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
            {rating}
          </AppText>
        </S.RatingRow>

        <S.PriceRow>
          <AppText variant="title" weight="bold" color="primary">
            {formattedPrice}
          </AppText>

          <Button icon={ShoppingCart} size="sm" onPress={handleAddToCart} />
        </S.PriceRow>
      </S.Content>
    </S.Container>
  );
}
