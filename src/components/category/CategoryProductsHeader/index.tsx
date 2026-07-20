import { ChevronLeft } from "lucide-react-native";
import { useTheme } from "@emotion/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, Icon } from "@/components/ui";

import { CategoryProductsHeaderProps } from "./types";
import * as S from "./styles";

export default function CategoryProductsHeader({
  category,
  productCount,
  onBackPress,
}: CategoryProductsHeaderProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <S.Container>
      <S.TopBar style={{ paddingTop: insets.top + theme.spacing.sm }}>
        <S.BackButton
          onPress={onBackPress}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Icon icon={ChevronLeft} size={22} color="text" />
        </S.BackButton>

        <S.TitleBlock>
          <AppText variant="title" weight="bold" numberOfLines={1}>
            {category?.name ?? "Category"}
          </AppText>
          <AppText variant="caption" color="textSecondary">
            {productCount} {productCount === 1 ? "product" : "products"}
          </AppText>
        </S.TitleBlock>
      </S.TopBar>

      {category?.image ? (
        <S.Banner>
          <S.BannerImage source={{ uri: category.image }} contentFit="cover" />

          <S.BannerOverlay
            colors={["transparent", theme.colors.black + "AA"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />

          <S.BannerContent>
            <AppText variant="h3" weight="bold" color="white">
              {category.name}
            </AppText>
          </S.BannerContent>
        </S.Banner>
      ) : null}
    </S.Container>
  );
}
