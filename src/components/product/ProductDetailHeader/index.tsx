import { ChevronLeft, Heart, Share2 } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/ui";

import { ProductDetailHeaderProps } from "./types";
import * as S from "./styles";

export default function ProductDetailHeader({
  onBackPress,
  onSharePress,
  onWishlistPress,
  isWishlisted = false,
}: ProductDetailHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <S.Container style={{ paddingTop: insets.top + 8 }}>
      <S.IconButton
        onPress={onBackPress}
        accessibilityRole="button"
        accessibilityLabel="Go back">
        <Icon icon={ChevronLeft} size={22} color="text" />
      </S.IconButton>

      <S.IconGroup>
        <S.IconButton
          onPress={onSharePress}
          accessibilityRole="button"
          accessibilityLabel="Share product">
          <Icon icon={Share2} size={20} color="text" />
        </S.IconButton>

        <S.IconButton
          onPress={onWishlistPress}
          accessibilityRole="button"
          accessibilityLabel={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }>
          <Icon
            icon={Heart}
            size={20}
            color={isWishlisted ? "danger" : "text"}
          />
        </S.IconButton>
      </S.IconGroup>
    </S.Container>
  );
}
