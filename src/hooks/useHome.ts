import { useCallback, useEffect, useMemo, useState } from "react";

import { Href, useRouter } from "expo-router";

import { banner, user as fallbackUser } from "@/constants/home";

import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

import { useGetCategoriesQuery } from "@/services/api/endpoints/categoryApi";
import {
  PRODUCTS_PAGE_SIZE,
  useGetProductsQuery,
  useSearchProductsQuery,
} from "@/services/api/endpoints/productApi";

import { getCategoryProductsRoute } from "@/utils/category.utils";

const SEARCH_DEBOUNCE_MS = 350;

export function useHome() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [productSkip, setProductSkip] = useState(0);
  const [searchSkip, setSearchSkip] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setSearchSkip(0);
      setProductSkip(0);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [search]);

  const isSearching = debouncedSearch.length > 0;

  const { addToCart } = useCart();
  const { toggleWishlist, wishlistedIds } = useWishlist();
  const { user: authUser, displayName } = useAuth();

  const user = {
    name: displayName || fallbackUser.name,
    avatar: authUser?.image ?? fallbackUser.avatar,
    notificationCount: fallbackUser.notificationCount,
  };

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isFetching: categoriesFetching,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

  const {
    data: productsResponse,
    isLoading: productsLoading,
    isFetching: productsFetching,
    isError: productsError,
    refetch: refetchProducts,
  } = useGetProductsQuery(
    { limit: PRODUCTS_PAGE_SIZE, skip: productSkip },
    { skip: isSearching },
  );

  const {
    data: searchResponse,
    isLoading: searchLoading,
    isFetching: searchFetching,
    isError: searchError,
    refetch: refetchSearch,
  } = useSearchProductsQuery(
    { q: debouncedSearch, limit: PRODUCTS_PAGE_SIZE, skip: searchSkip },
    { skip: !isSearching },
  );

  const activeResponse = isSearching ? searchResponse : productsResponse;
  const products = activeResponse?.products ?? [];
  const totalProducts = activeResponse?.total ?? 0;
  const hasMoreProducts = products.length < totalProducts;

  const handleCategoryPress = useCallback(
    (category: Category) => {
      router.push(getCategoryProductsRoute(category));
    },
    [router],
  );

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

  const handleLoadMoreProducts = useCallback(() => {
    if (isSearching) {
      if (searchFetching || !hasMoreProducts) return;
      setSearchSkip((prev) => prev + PRODUCTS_PAGE_SIZE);
      return;
    }

    if (productsFetching || !hasMoreProducts) return;

    setProductSkip((prev) => prev + PRODUCTS_PAGE_SIZE);
  }, [hasMoreProducts, isSearching, productsFetching, searchFetching]);

  const handleRefresh = useCallback(async () => {
    setProductSkip(0);
    setSearchSkip(0);

    if (isSearching) {
      await refetchSearch();
      return;
    }

    await Promise.all([refetchCategories(), refetchProducts()]);
  }, [isSearching, refetchCategories, refetchProducts, refetchSearch]);

  const handleClearSearch = useCallback(() => {
    setSearch("");
    setDebouncedSearch("");
    setSearchSkip(0);
  }, []);

  const handleBannerPress = useCallback(() => {
    router.push("/categories" as Href);
  }, [router]);

  const handleSeeAllProducts = useCallback(() => {
    router.push("/categories" as Href);
  }, [router]);

  const isInitialLoading = isSearching
    ? searchLoading
    : categoriesLoading || productsLoading;

  const isLoadingMore = isSearching
    ? searchSkip > 0 && searchFetching
    : productSkip > 0 && productsFetching;

  const isSearchPending = search.trim() !== debouncedSearch;

  const productSectionTitle = useMemo(() => {
    if (isSearching) {
      return debouncedSearch
        ? `Results for "${debouncedSearch}"`
        : "Search Results";
    }

    return "Popular Products";
  }, [debouncedSearch, isSearching]);

  return {
    user,
    banner,
    categories,
    products,
    search,
    isSearching,
    isSearchPending,
    productSectionTitle,
    wishlistedIds,
    loading: isInitialLoading || isSearchPending,
    loadingMore: isLoadingMore,
    error: isSearching ? searchError : productsError,
    refreshing:
      categoriesFetching ||
      productsFetching ||
      searchFetching,
    hasMoreProducts,
    refetch: handleRefresh,
    handleSearch: setSearch,
    handleClearSearch,
    handleCategoryPress,
    handleProductPress,
    handleWishlistPress,
    handleAddToCart,
    handleBannerPress,
    handleSeeAllProducts,
    handleLoadMoreProducts,
  };
}
