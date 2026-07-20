import { CartItem as CartItemModel } from "@/models/Cart";
import { Product } from "@/models/Product";

export interface CartItemProps {
  item: CartItemModel;

  onPress?: (product: Product) => void;

  onIncrement?: (product: Product) => void;

  onDecrement?: (product: Product) => void;

  onRemove?: (product: Product) => void;
}

export const CART_ITEM_IMAGE_SIZE = 88;
