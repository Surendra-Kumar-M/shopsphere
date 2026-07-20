import { useCallback, useMemo, useState } from "react";
import { Share } from "react-native";

import { Href, useRouter } from "expo-router";

import { Product } from "@/models/Product";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

import {
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} from "@/services/api/endpoints/productApi";

import {
  formatPrice,
  getDiscountedPrice,
  getProductImages,
  hasDiscount,
} from "@/utils/product.utils";

const RELATED_PRODUCTS_LIMIT = 6;

export function useProduct(productId: number) {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, wishlistedIds } = useWishlist();

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const { data: relatedResponse, isLoading: relatedLoading } =
    useGetProductsByCategoryQuery(
      { slug: product?.category ?? "", limit: RELATED_PRODUCTS_LIMIT + 1 },
      { skip: !product?.category },
    );

  const images = useMemo(
    () => (product ? getProductImages(product) : []),
    [product],
  );

  const relatedProducts = useMemo(
    () =>
      (relatedResponse?.products ?? []).filter((item) => item.id !== productId),
    [relatedResponse?.products, productId],
  );

  const pricing = useMemo(() => {
    if (!product) {
      return null;
    }

    const salePrice = getDiscountedPrice(
      product.price,
      product.discountPercentage,
    );

    return {
      originalPrice: product.price,
      salePrice,
      formattedOriginalPrice: formatPrice(product.price),
      formattedSalePrice: formatPrice(salePrice),
      hasDiscount: hasDiscount(product.discountPercentage),
      discountLabel: `${Math.round(product.discountPercentage)}% OFF`,
    };
  }, [product]);

  const isWishlisted = product ? wishlistedIds.includes(product.id) : false;
  const inCart = product ? isInCart(product.id) : false;
  const isOutOfStock = product ? product.stock <= 0 : false;

  const handleSelectImage = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/(tabs)" as Href);
  }, [router]);

  const handleShare = useCallback(async () => {
    if (!product) return;

    await Share.share({
      message: `${product.title} - ${pricing?.formattedSalePrice ?? formatPrice(product.price)}`,
      url: product.thumbnail,
    });
  }, [pricing?.formattedSalePrice, product]);

  const handleToggleWishlist = useCallback(() => {
    if (!product) return;

    toggleWishlist(product);
  }, [product, toggleWishlist]);

  const handleAddToCart = useCallback(() => {
    if (!product || isOutOfStock) return;

    addToCart(product);
  }, [addToCart, isOutOfStock, product]);

  const handleBuyNow = useCallback(() => {
    if (!product || isOutOfStock) return;

    addToCart(product);
    router.push("/(tabs)/cart" as Href);
  }, [addToCart, isOutOfStock, product, router]);

  const handleRelatedProductPress = useCallback(
    (relatedProduct: Product) => {
      setSelectedImageIndex(0);
      router.push({
        pathname: "/product/[id]",
        params: { id: String(relatedProduct.id) },
      } as Href);
    },
    [router],
  );

  return {
    product,
    images,
    selectedImageIndex,
    relatedProducts,
    pricing,
    isWishlisted,
    inCart,
    isOutOfStock,
    loading: isLoading,
    refreshing: isFetching && !isLoading,
    relatedLoading,
    error: isError,
    refetch,
    handleSelectImage,
    handleBack,
    handleShare,
    handleToggleWishlist,
    handleAddToCart,
    handleBuyNow,
    handleRelatedProductPress,
    handleRelatedWishlistPress: toggleWishlist,
    handleRelatedAddToCartPress: addToCart,
    wishlistedIds,
  };
}
