import { useCallback } from "react";

import { Product } from "@/models/Product";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  selectWishlistItems,
  selectWishlistIds,
} from "@/store/slices/wishlistSlice";

export function useWishlist() {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectWishlistItems);

  const wishlistedIds = useAppSelector(selectWishlistIds);

  const handleToggleWishlist = useCallback(
    (product: Product) => {
      dispatch(toggleWishlist(product));
    },
    [dispatch],
  );

  const handleAddToWishlist = useCallback(
    (product: Product) => {
      dispatch(addToWishlist(product));
    },
    [dispatch],
  );

  const handleRemoveFromWishlist = useCallback(
    (productId: number) => {
      dispatch(removeFromWishlist(productId));
    },
    [dispatch],
  );

  const handleClearWishlist = useCallback(() => {
    dispatch(clearWishlist());
  }, [dispatch]);

  const checkIsWishlisted = useCallback(
    (productId: number) => items.some((item) => item.productId === productId),
    [items],
  );

  return {
    items,
    wishlistedIds,
    toggleWishlist: handleToggleWishlist,
    addToWishlist: handleAddToWishlist,
    removeFromWishlist: handleRemoveFromWishlist,
    clearWishlist: handleClearWishlist,
    isWishlisted: checkIsWishlisted,
  };
}
