import { useState } from "react";

import { banner, user } from "@/constants/home";

import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "@/services/api/endpoints/categoryApi";

import { useGetProductsQuery } from "@/services/api/endpoints/productApi";

export function useHome() {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const {
    data: productsResponse,
    isLoading: productsLoading,
    isFetching: productsFetching,
    isError,
    refetch,
  } = useGetProductsQuery(undefined, {
    skip: !!selectedCategory,
  });

  const {
    data: categoryProductsResponse,
    isLoading: categoryLoading,
    isFetching: categoryFetching,
  } = useGetProductsByCategoryQuery(selectedCategory!, {
    skip: !selectedCategory,
  });

  const products = selectedCategory
    ? (categoryProductsResponse?.products ?? [])
    : (productsResponse?.products ?? []);

  const filteredProducts = search.trim()
    ? products.filter((product:Product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      )
    : products;

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory((prev) =>
      prev === category.slug ? undefined : category.slug,
    );
  };

  const handleProductPress = (product: Product) => {
    console.log(product);
  };

  const handleWishlistPress = (product: Product) => {
    console.log(product);
  };

  const handleAddToCart = (product: Product) => {
    console.log(product);
  };

  return {
    user,

    banner,

    categories,

    products: filteredProducts,

    search,

    selectedCategory,

    loading:
      productsLoading ||
      productsFetching ||
      categoryLoading ||
      categoryFetching ||
      categoriesLoading,

    error: isError,

    refetch,

    handleSearch: setSearch,

    handleCategoryPress,

    handleProductPress,

    handleWishlistPress,

    handleAddToCart,

    handleBannerPress: () => {},

    handleSeeAllProducts: () => {},
  };
}
