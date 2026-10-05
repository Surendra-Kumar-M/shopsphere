import { ImageSourcePropType } from "react-native";

export interface PromoBannerProps {
  title: string;

  subtitle: string;

  buttonText?: string;

  image: ImageSourcePropType;

  onPress?: () => void;
}

export const PROMO_BANNER_HEIGHT = 180;

export const PROMO_IMAGE_SIZE = 140;