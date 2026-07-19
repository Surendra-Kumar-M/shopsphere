import { Product } from "@/models/Product";

export interface ProductCardProps {
  product: Product;

  isWishlisted?: boolean;

  onWishlistPress?: (product: Product) => void;

  onAddToCartPress?: (product: Product) => void;

  onPress?: (product: Product) => void;
}

export const PRODUCT_CARD_WIDTH = 180;

export const PRODUCT_IMAGE_HEIGHT = 160;