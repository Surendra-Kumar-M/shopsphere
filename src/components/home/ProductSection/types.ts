import { Product } from "@/models/Product";

export interface ProductSectionProps {
  title?: string;

  products: Product[];

  onProductPress?: (product: Product) => void;

  onWishlistPress?: (product: Product) => void;

  onAddToCartPress?: (product: Product) => void;

  onSeeAllPress?: () => void;
}
