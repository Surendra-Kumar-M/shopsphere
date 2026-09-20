import { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { useTheme } from "@emotion/react";
import { Href, useRouter } from "expo-router";

import { CartItem, CartSummary } from "@/components/cart";
import { AppText, Button, Screen } from "@/shared/components";

import { useCart } from "@/hooks/useCart";
import { usePayment } from "@/hooks/usePayment";

import { CartItem as CartItemModel } from "@/models/Cart";
import { Product } from "@/models/Product";

import * as S from "./styles";

export default function CartScreen() {
  const router = useRouter();
  const theme = useTheme();

  const {
    items,
    count,
    subtotal,
    isLoading: isCartLoading,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { pay, isLoading: isPaymentLoading } = usePayment();

  const handleProductPress = useCallback(
    (product: Product) => {
      router.push({
        pathname: "/product/[id]",
        params: { id: String(product.id) },
      } as Href);
    },
    [router],
  );

  const handleIncrement = useCallback(
    (product: Product) => {
      const item = items.find((cartItem) => cartItem.productId === product.id);

      if (!item) return;

      updateQuantity(product.id, item.quantity + 1);
    },
    [items, updateQuantity],
  );

  const handleDecrement = useCallback(
    (product: Product) => {
      const item = items.find((cartItem) => cartItem.productId === product.id);

      if (!item) return;

      updateQuantity(product.id, item.quantity - 1);
    },
    [items, updateQuantity],
  );

  const handleShopNow = useCallback(() => {
    router.push("/(tabs)" as Href);
  }, [router]);

  const handleCheckout = useCallback(async () => {
    const success = await pay(subtotal);

    if (success) {
      clearCart();
    }
  }, [pay, subtotal, clearCart]);

  const renderItem: ListRenderItem<CartItemModel> = useCallback(
    ({ item }) => (
      <CartItem
        item={item}
        onPress={handleProductPress}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={(product) => removeFromCart(product.id)}
      />
    ),
    [handleDecrement, handleIncrement, handleProductPress, removeFromCart],
  );

  const keyExtractor = useCallback(
    (item: CartItemModel) => item.productId.toString(),
    [],
  );

  if (items.length === 0) {
    return (
      <Screen scrollable={false}>
        <S.EmptyContainer>
          <AppText variant="h1" weight="bold" align="center">
            Your Cart
          </AppText>

          <AppText variant="body" color="textSecondary" align="center">
            Your cart is empty. Start shopping to add items.
          </AppText>

          <Button title="Start Shopping" onPress={handleShopNow} />
        </S.EmptyContainer>
      </Screen>
    );
  }

  return (
    <Screen safeArea padding={false} scrollable={false}>
      <S.Layout>
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.lg,
            paddingBottom: theme.spacing.lg,
            gap: theme.spacing.md,
          }}
          ListHeaderComponent={
            <S.Header style={{ paddingHorizontal: 0 }}>
              <AppText variant="h1" weight="bold">
                Your Cart
              </AppText>
              <AppText variant="body" color="textSecondary">
                {count} {count === 1 ? "item" : "items"} in your cart
              </AppText>
            </S.Header>
          }
        />

        <CartSummary
          itemCount={count}
          subtotal={subtotal}
          loading={isPaymentLoading || isCartLoading}
          onCheckoutPress={handleCheckout}
        />
      </S.Layout>
    </Screen>
  );
}

