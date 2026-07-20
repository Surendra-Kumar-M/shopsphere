import { Category } from "@/models/Category";

export interface CategoryProductsHeaderProps {
  category?: Category;
  productCount: number;
  onBackPress: () => void;
}

export const CATEGORY_BANNER_HEIGHT = 180;
