import { Review } from "@/models/Product";

export interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
}

export interface ReviewCardProps {
  review: Review;
}
