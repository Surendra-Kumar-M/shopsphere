import { Category } from "@/models/Category";

export interface CategoryGridProps {
  categories: Category[];
  loading?: boolean;
  onCategoryPress?: (category: Category) => void;
}

export const GRID_COLUMNS = 2;

export const GRID_SKELETON_COUNT = 8;
