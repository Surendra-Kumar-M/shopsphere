export interface ProductDetailHeaderProps {
  onBackPress: () => void;
  onSharePress: () => void;
  onWishlistPress: () => void;
  isWishlisted?: boolean;
}

export const HEADER_BUTTON_SIZE = 40;
