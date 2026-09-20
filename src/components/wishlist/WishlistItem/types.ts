import { Product } from "@/models/Product";
import { WishlistItem as WishlistItemModel } from "@/models/Wishlist";

export interface WishlistItemProps {
  item: WishlistItemModel;

  onPress?: (product: Product) => void;

  onAddToCartPress?: (product: Product) => void;

  onRemovePress?: (product: Product) => void;
}

export const WISHLIST_ITEM_IMAGE_SIZE = 96;
