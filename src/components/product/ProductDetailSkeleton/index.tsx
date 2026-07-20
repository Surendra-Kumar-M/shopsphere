import { SkeletonLoader } from "@/components/ui";
import { Radius } from "@/theme/radius";

import { GALLERY_HEIGHT } from "../ProductGallery/types";
import * as S from "./styles";

export default function ProductDetailSkeleton() {
  return (
    <S.Container>
      <SkeletonLoader width="100%" height={GALLERY_HEIGHT} radius={0} />

      <S.Content>
        <SkeletonLoader width={100} height={24} radius={Radius.sm} />
        <SkeletonLoader width="90%" height={32} radius={Radius.sm} />
        <SkeletonLoader width="70%" height={20} radius={Radius.sm} />
        <SkeletonLoader width={140} height={36} radius={Radius.sm} />
        <SkeletonLoader width="100%" height={80} radius={Radius.md} />
        <SkeletonLoader width="100%" height={160} radius={Radius.md} />
      </S.Content>
    </S.Container>
  );
}
