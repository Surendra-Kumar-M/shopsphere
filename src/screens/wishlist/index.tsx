import { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { useTheme } from "@emotion/react";
import { Href, useRouter } from "expo-router";

import { WishlistItem } from "@/components/wishlist";
import { AppText, Button, Screen } from "@/components/ui";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

import { Product } from "@/models/Product";

import * as S from "./styles";

export default function WishlistScreen() {
  const router = useRouter();
  const theme = useTheme();

  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleProductPress = useCallback(
    (product: Product) => {
      router.push({
        pathname: "/product/[id]",
        params: { id: String(product.id) },
      } as Href);
    },
    [router],
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(product);
    },
    [addToCart],
  );

  const handleShopNow = useCallback(() => {
    router.push("/(tabs)" as Href);
  }, [router]);

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <WishlistItem
        product={item}
        onPress={handleProductPress}
        onAddToCartPress={handleAddToCart}
        onRemovePress={(product) => removeFromWishlist(product.id)}
      />
    ),
    [handleAddToCart, handleProductPress, removeFromWishlist],
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  if (items.length === 0) {
    return (
      <Screen scrollable={false}>
        <S.EmptyContainer>
          <AppText variant="h1" weight="bold" align="center">
            Wishlist
          </AppText>

          <AppText variant="body" color="textSecondary" align="center">
            Save products you love and shop them later.
          </AppText>

          <Button title="Browse Products" onPress={handleShopNow} />
        </S.EmptyContainer>
      </Screen>
    );
  }

  return (
    <Screen safeArea padding={false} scrollable={false}>
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: theme.spacing.xxxl,
          gap: theme.spacing.md,
        }}
        ListHeaderComponent={
          <S.Header style={{ paddingHorizontal: 0 }}>
            <AppText variant="h1" weight="bold">
              Wishlist
            </AppText>
            <AppText variant="body" color="textSecondary">
              {items.length} saved {items.length === 1 ? "item" : "items"}
            </AppText>
          </S.Header>
        }
      />
    </Screen>
  );
}
