import { FlatList } from "react-native";

import SectionHeader from "../SectionHeader";
import ProductCard from "../ProductCard";

import { ProductSectionProps } from "./types";

import * as S from "./styles";

export default function ProductSection({
  title = "Popular Products",

  products,

  onProductPress,

  onWishlistPress,

  onAddToCartPress,

  onSeeAllPress,
}: ProductSectionProps) {
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
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 16,
        }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={onProductPress}
            onWishlistPress={onWishlistPress}
            onAddToCartPress={onAddToCartPress}
          />
        )}
      />
    </S.Container>
  );
}
