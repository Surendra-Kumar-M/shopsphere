import { useCallback } from "react";

import { Product } from "@/models/Product";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartSubtotal,
  selectIsCartLoading,
} from "@/store/slices/cartSlice";

export function useCart() {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);

  const count = useAppSelector(selectCartCount);

  const subtotal = useAppSelector(selectCartSubtotal);

  const isLoading = useAppSelector(selectIsCartLoading);

  const handleAddToCart = useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
    },
    [dispatch],
  );

  const handleRemoveFromCart = useCallback(
    (productId: number) => {
      dispatch(removeFromCart(productId));
    },
    [dispatch],
  );

  const handleUpdateQuantity = useCallback(
    (productId: number, quantity: number) => {
      dispatch(updateQuantity({ productId, quantity }));
    },
    [dispatch],
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const checkIsInCart = useCallback(
    (productId: number) =>
      items.some((item) => item.productId === productId),
    [items],
  );

  return {
    items,
    count,
    subtotal,
    isLoading,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    isInCart: checkIsInCart,
  };
}
