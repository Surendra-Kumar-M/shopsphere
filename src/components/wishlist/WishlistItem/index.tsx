import { Heart, Star } from "lucide-react-native";
import { useTheme } from "@emotion/react";

import { AppText, Button, Icon, SkeletonLoader } from "@/shared/components";

import { useGetProductByIdQuery } from "@/services/api/endpoints/productApi";

import {
  formatPrice,
  getDiscountedPrice,
  hasDiscount,
} from "@/utils/product.utils";

import { WishlistItemProps } from "./types";
import * as S from "./styles";

export default function WishlistItem({
  item,
  onPress,
  onAddToCartPress,
  onRemovePress,
}: WishlistItemProps) {
  const theme = useTheme();

  const { data: product, isLoading, isError } = useGetProductByIdQuery(item.productId);

  if (isLoading || isError || !product) {
    return (
      <S.Container accessibilityRole="none">
        <SkeletonLoader 
          width={96} 
          height={96} 
          style={{ borderRadius: theme.spacing.sm }} 
        />
        <S.Content>
           <SkeletonLoader width="80%" height={20} />
           <SkeletonLoader width="30%" height={16} style={{ marginTop: 8 }} />
           <SkeletonLoader width="60%" height={32} style={{ marginTop: 12 }} />
        </S.Content>
      </S.Container>
    );
  }

  const salePrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <S.Container
      onPress={() => onPress?.(product)}
      accessibilityRole="button">
      <S.ImageWrapper>
        <S.ProductImage source={{ uri: product.thumbnail }} contentFit="contain" />
      </S.ImageWrapper>

      <S.Content>
        <S.TopRow>
          <S.TitleBlock>
            <AppText variant="body" weight="semibold" numberOfLines={2}>
              {product.title}
            </AppText>

            <S.RatingRow>
              <Star
                size={14}
                color={theme.colors.warning}
                fill={theme.colors.warning}
              />
              <AppText variant="caption" color="textSecondary">
                {product.rating.toFixed(1)}
              </AppText>
            </S.RatingRow>
          </S.TitleBlock>

          <S.RemoveButton
            onPress={() => onRemovePress?.(product)}
            accessibilityRole="button"
            accessibilityLabel="Remove from wishlist">
            <Icon icon={Heart} size={18} color="danger" />
          </S.RemoveButton>
        </S.TopRow>

        <AppText variant="title" weight="bold" color="primary">
          {formatPrice(salePrice)}
        </AppText>

        {hasDiscount(product.discountPercentage) ? (
          <AppText
            variant="caption"
            color="textSecondary"
            style={{ textDecorationLine: "line-through" }}>
            {formatPrice(product.price)}
          </AppText>
        ) : null}

        <S.Actions>
          <Button
            title="Add to Cart"
            size="sm"
            onPress={() => onAddToCartPress?.(product)}
          />
        </S.Actions>
      </S.Content>
    </S.Container>
  );
}
