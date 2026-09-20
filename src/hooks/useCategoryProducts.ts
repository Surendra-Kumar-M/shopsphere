import { useCallback, useEffect, useMemo, useState } from "react";

import { Href, useRouter } from "expo-router";

import { Product } from "@/models/Product";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

import { useGetCategoriesQuery } from "@/services/api/endpoints/categoryApi";
import {
  PRODUCTS_PAGE_SIZE,
  useGetProductsByCategoryQuery,
} from "@/services/api/endpoints/productApi";

import { findCategoryBySlug } from "@/utils/category.utils";

export function useCategoryProducts(slug: string) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [productSkip, setProductSkip] = useState(0);

  // Intentional: reset search and pagination synchronously when the category
  // slug changes. This is a deliberate UI reset, not an accidental cascade:
  // slug change is user-initiated (navigation event), so the double-render
  // is acceptable and expected.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch("");
    setProductSkip(0);
  }, [slug]);


  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const category = useMemo(
    () => findCategoryBySlug(categories, slug),
    [categories, slug],
  );

  const {
    data: productsResponse,
    isLoading: productsLoading,
    isFetching: productsFetching,
    isError,
    refetch,
  } = useGetProductsByCategoryQuery(
    { slug, limit: PRODUCTS_PAGE_SIZE, skip: productSkip },
    { skip: !slug },
  );

  const { addToCart } = useCart();
  const { toggleWishlist, wishlistedIds } = useWishlist();

  const products = useMemo(
    () => productsResponse?.products ?? [],
    [productsResponse],
  );
  const totalProducts = productsResponse?.total ?? 0;
  const hasMoreProducts = products.length < totalProducts;

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) =>
      product.title.toLowerCase().includes(query),
    );
  }, [products, search]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/(tabs)/categories" as Href);
  }, [router]);

  const handleProductPress = useCallback(
    (product: Product) => {
      router.push({
        pathname: "/product/[id]",
        params: { id: String(product.id) },
      } as Href);
    },
    [router],
  );

  const handleWishlistPress = useCallback(
    (product: Product) => {
      toggleWishlist(product);
    },
    [toggleWishlist],
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(product);
    },
    [addToCart],
  );

  const handleLoadMore = useCallback(() => {
    if (productsFetching || !hasMoreProducts || search.trim()) {
      return;
    }

    setProductSkip((prev) => prev + PRODUCTS_PAGE_SIZE);
  }, [hasMoreProducts, productsFetching, search]);

  const handleRefresh = useCallback(async () => {
    setProductSkip(0);
    await refetch();
  }, [refetch]);

  const isInitialLoading = categoriesLoading || productsLoading;
  const isLoadingMore = productSkip > 0 && productsFetching;

  return {
    category,
    products: filteredProducts,
    totalProducts,
    filteredCount: filteredProducts.length,
    search,
    wishlistedIds,
    loading: isInitialLoading,
    loadingMore: isLoadingMore,
    refreshing: productsFetching && !isLoadingMore && !isInitialLoading,
    error: isError,
    hasMoreProducts,
    refetch: handleRefresh,
    handleBack,
    handleSearch: setSearch,
    handleProductPress,
    handleWishlistPress,
    handleAddToCart,
    handleLoadMore,
  };
}
