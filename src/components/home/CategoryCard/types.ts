import { Category } from "@/models/Category";


export interface CategoryCardProps {
  category: Category;

  selected?: boolean;

  onPress?: () => void;
}

export const CATEGORY_CARD_SIZE = 88;

export const CATEGORY_IMAGE_SIZE = 44;