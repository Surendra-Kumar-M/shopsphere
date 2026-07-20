import { Category } from "@/models/Category";

export interface CategoryFeaturedProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
}
