import { Minus, Plus, Trash2 } from "lucide-react-native";
import { useTheme } from "@emotion/react";

import { AppText, Icon, SkeletonLoader } from "@/shared/components";

import { getCartItemTotal } from "@/store/slices/cartSlice";

import { useGetProductByIdQuery } from "@/services/api/endpoints/productApi";

import {
  formatPrice,
  getDiscountedPrice,
} from "@/utils/product.utils";

import { CartItemProps } from "./types";
import * as S from "./styles";

export default function CartItem({
  item,
  onPress,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const theme = useTheme();
  const { productId, quantity } = item;

  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId);

  if (isLoading || isError || !product) {
    return (
      <S.Container accessibilityRole="none">
        <SkeletonLoader 
          width={88} 
          height={88} 
          style={{ borderRadius: theme.spacing.sm }} 
        />
        <S.Content>
           <SkeletonLoader width="80%" height={20} />
           <SkeletonLoader width="40%" height={16} style={{ marginTop: 8 }} />
        </S.Content>
      </S.Container>
    );
  }

  const unitPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  const lineTotal = getCartItemTotal(product, quantity);

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

            <AppText variant="caption" color="textSecondary">
              {formatPrice(unitPrice)} each
            </AppText>
          </S.TitleBlock>

          <S.RemoveButton
            onPress={() => onRemove?.(product)}
            accessibilityRole="button"
            accessibilityLabel="Remove item">
            <Icon icon={Trash2} size={18} color="danger" />
          </S.RemoveButton>
        </S.TopRow>

        <S.BottomRow>
          <S.QuantityControls>
            <S.QuantityButton
              onPress={() => onDecrement?.(product)}
              accessibilityRole="button"
              accessibilityLabel="Decrease quantity">
              <Minus size={14} color={theme.colors.text} />
            </S.QuantityButton>

            <AppText variant="body" weight="semibold">
              {quantity}
            </AppText>

            <S.QuantityButton
              onPress={() => onIncrement?.(product)}
              accessibilityRole="button"
              accessibilityLabel="Increase quantity">
              <Plus size={14} color={theme.colors.text} />
            </S.QuantityButton>
          </S.QuantityControls>

          <AppText variant="title" weight="bold" color="primary">
            {formatPrice(lineTotal)}
          </AppText>
        </S.BottomRow>
      </S.Content>
    </S.Container>
  );
}
