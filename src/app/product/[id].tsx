import { useLocalSearchParams } from "expo-router";

import { AuthGuard } from "@/components/auth";

import ProductScreen from "@/screens/product";

export default function ProductDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);

  return (
    <AuthGuard>
      <ProductScreen productId={productId} />
    </AuthGuard>
  );
}
