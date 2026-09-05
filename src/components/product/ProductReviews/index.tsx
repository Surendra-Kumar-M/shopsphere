import { Star } from "lucide-react-native";
import { useTheme } from "@emotion/react";

import { AppText } from "@/shared/components";

import { ProductReviewsProps } from "./types";
import * as S from "./styles";

function ReviewStars({ rating }: { rating: number }) {
  const theme = useTheme();

  return (
    <S.Stars>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < Math.round(rating);

        return (
          <Star
            key={`star-${index}`}
            size={14}
            color={theme.colors.warning}
            fill={filled ? theme.colors.warning : "transparent"}
          />
        );
      })}
    </S.Stars>
  );
}

export default function ProductReviews({
  reviews,
  averageRating,
}: ProductReviewsProps) {
  if (!reviews.length) {
    return null;
  }

  return (
    <S.Container>
      <AppText variant="title" weight="bold">
        Customer Reviews
      </AppText>

      <S.Summary>
        <ReviewStars rating={averageRating} />
        <AppText variant="bodySmall" color="textSecondary">
          {averageRating.toFixed(1)} · {reviews.length} reviews
        </AppText>
      </S.Summary>

      <S.ReviewList>
        {reviews.map((review, index) => (
          <S.ReviewCard key={`${review.reviewerEmail}-${index}`}>
            <S.ReviewHeader>
              <AppText variant="body" weight="semibold">
                {review.reviewerName}
              </AppText>
              <ReviewStars rating={review.rating} />
            </S.ReviewHeader>

            <AppText variant="bodySmall" color="textSecondary">
              {review.comment}
            </AppText>
          </S.ReviewCard>
        ))}
      </S.ReviewList>
    </S.Container>
  );
}
