import { Product } from "@/models/Product";

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface ProductSpecsProps {
  product: Product;
}
