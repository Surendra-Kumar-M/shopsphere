import { Product } from "@/models/Product";

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function getDiscountedPrice(
  price: number,
  discountPercentage: number,
): number {
  if (discountPercentage <= 0) {
    return price;
  }

  return price - (price * discountPercentage) / 100;
}

export function hasDiscount(discountPercentage: number): boolean {
  return discountPercentage > 0;
}

export function getStockLabel(stock: number): string {
  if (stock <= 0) {
    return "Out of stock";
  }

  if (stock < 10) {
    return `Only ${stock} left`;
  }

  return "In stock";
}

export function getStockBadgeVariant(
  stock: number,
): "inStock" | "trending" | "outOfStock" {
  if (stock <= 0) {
    return "outOfStock";
  }

  if (stock < 10) {
    return "trending";
  }

  return "inStock";
}

export function getProductImages(product: Product): string[] {
  if (product.images.length > 0) {
    return product.images;
  }

  return [product.thumbnail];
}

export function getAverageReviewRating(
  reviews: Product["reviews"],
  fallbackRating: number,
): number {
  if (!reviews?.length) {
    return fallbackRating;
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return total / reviews.length;
}
