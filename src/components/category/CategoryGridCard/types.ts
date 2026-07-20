import { Category } from "@/models/Category";

export interface CategoryGridCardProps {
  category: Category;
  width: number;
  onPress?: (category: Category) => void;
}

export const GRID_CARD_HEIGHT = 148;

export const FEATURED_CARD_WIDTH = 220;

export const FEATURED_CARD_HEIGHT = 120;
