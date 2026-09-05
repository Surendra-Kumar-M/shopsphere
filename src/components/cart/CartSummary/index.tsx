import { AppText, Button } from "@/shared/components";

import { formatPrice } from "@/utils/product.utils";

import { CartSummaryProps } from "./types";
import * as S from "./styles";

export default function CartSummary({
  itemCount,
  subtotal,
  loading,
  onCheckoutPress,
}: CartSummaryProps) {
  return (
    <S.Container>
      <S.Row>
        <AppText variant="body" color="textSecondary">
          Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
        </AppText>

        <AppText variant="title" weight="bold" color="primary">
          {formatPrice(subtotal)}
        </AppText>
      </S.Row>

      <Button
        title="Proceed to Checkout"
        fullWidth
        loading={loading}
        onPress={onCheckoutPress}
      />
    </S.Container>
  );
}

