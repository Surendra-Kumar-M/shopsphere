import { useLocalSearchParams } from "expo-router";

import { AuthGuard } from "@/components/auth";

import CategoryProductsScreen from "@/screens/category-products";

export default function CategoryProductsRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return (
    <AuthGuard>
      <CategoryProductsScreen slug={slug ?? ""} />
    </AuthGuard>
  );
}
