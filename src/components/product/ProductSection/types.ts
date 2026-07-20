import { Product } from "@/models/Product";

export interface ProductSectionProps {
  title?: string;

  products: Product[];

  loading?: boolean;

  loadingMore?: boolean;

  wishlistedIds?: number[];

  onProductPress?: (product: Product) => void;

  onWishlistPress?: (product: Product) => void;

  onAddToCartPress?: (product: Product) => void;

  onSeeAllPress?: () => void;

  onEndReached?: () => void;
}

export const PRODUCT_SKELETON_COUNT = 4;
