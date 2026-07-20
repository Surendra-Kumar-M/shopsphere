import { Category } from "@/models/Category";



export interface CategorySectionProps {
  title?: string;

  categories: Category[];

  selectedCategorySlug?: string;

  loading?: boolean;

  onCategoryPress?: (category: Category) => void;

  onSeeAllPress?: () => void;
}

export const CATEGORY_SKELETON_COUNT = 6;
