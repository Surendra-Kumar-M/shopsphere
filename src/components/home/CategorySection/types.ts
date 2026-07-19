import { Category } from "@/models/Category";



export interface CategorySectionProps {
  title?: string;

  categories: Category[];

  selectedCategorySlug?: string;

  onCategoryPress?: (category: Category) => void;

  onSeeAllPress?: () => void;
}
