import { AppText } from "@/components/ui";

import { ProductSpecItem, ProductSpecsProps } from "./types";
import * as S from "./styles";

function buildSpecs(product: ProductSpecsProps["product"]): ProductSpecItem[] {
  const specs: ProductSpecItem[] = [
    { label: "Brand", value: product.brand ?? "N/A" },
    { label: "Category", value: product.category },
    { label: "SKU", value: product.sku ?? "N/A" },
    { label: "Availability", value: product.availabilityStatus ?? "In Stock" },
    { label: "Shipping", value: product.shippingInformation ?? "Standard delivery" },
    { label: "Warranty", value: product.warrantyInformation ?? "Manufacturer warranty" },
    { label: "Returns", value: product.returnPolicy ?? "Standard return policy" },
  ];

  if (product.weight) {
    specs.push({ label: "Weight", value: `${product.weight} oz` });
  }

  if (product.dimensions) {
    specs.push({
      label: "Dimensions",
      value: `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`,
    });
  }

  return specs;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  const specs = buildSpecs(product);

  return (
    <S.Container>
      <AppText variant="title" weight="bold">
        Specifications
      </AppText>

      <S.Grid>
        {specs.map((spec) => (
          <S.Row key={spec.label}>
            <S.Label>
              <AppText variant="bodySmall" color="textSecondary">
                {spec.label}
              </AppText>
            </S.Label>

            <S.Value>
              <AppText variant="bodySmall" weight="medium" align="right">
                {spec.value}
              </AppText>
            </S.Value>
          </S.Row>
        ))}
      </S.Grid>

      {product.tags?.length ? (
        <S.TagRow>
          {product.tags.map((tag) => (
            <S.Tag key={tag}>
              <AppText variant="caption" color="textSecondary">
                {tag}
              </AppText>
            </S.Tag>
          ))}
        </S.TagRow>
      ) : null}
    </S.Container>
  );
}
