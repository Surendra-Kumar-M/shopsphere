import { Product } from "@/models/Product";

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  loadingMore?: boolean;
  wishlistedIds?: number[];
  onProductPress?: (product: Product) => void;
  onWishlistPress?: (product: Product) => void;
  onAddToCartPress?: (product: Product) => void;
  onEndReached?: () => void;
}

export const PRODUCT_GRID_COLUMNS = 2;

export const PRODUCT_GRID_SKELETON_COUNT = 6;
