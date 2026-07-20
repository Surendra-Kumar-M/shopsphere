export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;

  price: number;
  discountPercentage: number;

  rating: number;
  stock: number;

  brand?: string;
  sku?: string;

  thumbnail: string;
  images: string[];

  tags?: string[];
  weight?: number;
  dimensions?: ProductDimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  reviews?: Review[];
}
