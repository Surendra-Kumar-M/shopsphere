import { useCallback, useMemo, useState } from "react";

import { useRouter } from "expo-router";

import { Category } from "@/models/Category";

import { useGetCategoriesQuery } from "@/services/api/endpoints/categoryApi";

import {
  filterCategories,
  getCategoryProductsRoute,
  getFeaturedCategories,
} from "@/utils/category.utils";

export function useCategories() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const {
    data: categories = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCategoriesQuery();

  const filteredCategories = useMemo(
    () => filterCategories(categories, search),
    [categories, search],
  );

  const featuredCategories = useMemo(
    () => getFeaturedCategories(categories),
    [categories],
  );

  const handleCategoryPress = useCallback(
    (category: Category) => {
      router.push(getCategoryProductsRoute(category));
    },
    [router],
  );

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  return {
    categories: filteredCategories,
    allCategories: categories,
    featuredCategories,
    totalCount: categories.length,
    filteredCount: filteredCategories.length,
    search,
    loading: isLoading,
    refreshing: isFetching && !isLoading,
    error: isError,
    refetch,
    handleCategoryPress,
    handleSearch,
    handleClearSearch,
  };
}
