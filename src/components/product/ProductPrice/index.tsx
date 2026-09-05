import { AppText, Badge } from "@/shared/components";

import { ProductPriceProps } from "./types";
import * as S from "./styles";

export default function ProductPrice({
  formattedSalePrice,
  formattedOriginalPrice,
  hasDiscount,
  discountLabel,
}: ProductPriceProps) {
  return (
    <S.Container>
      <AppText variant="h2" weight="bold" color="primary">
        {formattedSalePrice}
      </AppText>

      {hasDiscount ? (
        <>
          <S.OriginalPrice>
            <AppText
              variant="body"
              color="textSecondary"
              style={{ textDecorationLine: "line-through" }}>
              {formattedOriginalPrice}
            </AppText>
          </S.OriginalPrice>

          {discountLabel ? <Badge label={discountLabel} variant="sale" /> : null}
        </>
      ) : null}
    </S.Container>
  );
}
