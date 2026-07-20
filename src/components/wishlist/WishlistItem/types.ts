import { Product } from "@/models/Product";

export interface WishlistItemProps {
  product: Product;

  onPress?: (product: Product) => void;

  onAddToCartPress?: (product: Product) => void;

  onRemovePress?: (product: Product) => void;
}

export const WISHLIST_ITEM_IMAGE_SIZE = 96;
