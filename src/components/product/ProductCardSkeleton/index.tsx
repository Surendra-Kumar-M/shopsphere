import { SkeletonLoader } from "@/components/ui";
import { Radius } from "@/theme/radius";

import { SKELETON_CARD_WIDTH, SKELETON_IMAGE_HEIGHT } from "./types";
import * as S from "./styles";

export default function ProductCardSkeleton() {
  return (
    <S.Container>
      <S.ImageSkeleton>
        <SkeletonLoader
          width={SKELETON_CARD_WIDTH - 24}
          height={SKELETON_IMAGE_HEIGHT - 16}
          radius={Radius.lg}
        />
      </S.ImageSkeleton>

      <S.Content>
        <SkeletonLoader width={60} height={20} radius={Radius.sm} />
        <SkeletonLoader width={SKELETON_CARD_WIDTH - 48} height={16} radius={Radius.sm} />
        <SkeletonLoader width={40} height={14} radius={Radius.sm} />
        <SkeletonLoader width={80} height={24} radius={Radius.sm} />
      </S.Content>
    </S.Container>
  );
}
