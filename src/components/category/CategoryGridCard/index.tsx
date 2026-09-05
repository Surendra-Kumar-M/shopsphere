import { useTheme } from "@emotion/react";

import { AppText } from "@/shared/components";

import { CategoryGridCardProps } from "./types";
import * as S from "./styles";

interface CategoryCardBaseProps extends CategoryGridCardProps {
  variant: "grid" | "featured";
}

function CategoryCardBase({
  category,
  width,
  variant,
  onPress,
}: CategoryCardBaseProps) {
  const theme = useTheme();

  const Container = variant === "grid" ? S.GridContainer : S.FeaturedContainer;

  const handlePress = () => {
    onPress?.(category);
  };

  return (
    <Container
      width={width}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Browse ${category.name}`}>
      {variant === "grid" ? (
        <>
          <S.ImageWrapper>
            <S.GridImage source={{ uri: category.image }} contentFit="contain" />
          </S.ImageWrapper>

          <S.Overlay
            colors={["transparent", theme.colors.black + "CC"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />

          <S.Content>
            <AppText variant="bodySmall" weight="semibold" color="white" numberOfLines={2}>
              {category.name}
            </AppText>
          </S.Content>
        </>
      ) : (
        <>
          <S.BackgroundImage source={{ uri: category.image }} contentFit="cover" />

          <S.Overlay
            colors={["transparent", theme.colors.black + "DD"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />

          <S.Content>
            <AppText variant="button" weight="semibold" color="white" numberOfLines={1}>
              {category.name}
            </AppText>
          </S.Content>
        </>
      )}
    </Container>
  );
}

export function CategoryGridCard(props: CategoryGridCardProps) {
  return <CategoryCardBase {...props} variant="grid" />;
}

export function CategoryFeaturedCard(
  props: Omit<CategoryGridCardProps, "width"> & { width?: number },
) {
  return (
    <CategoryCardBase
      {...props}
      width={props.width ?? 0}
      variant="featured"
    />
  );
}

export default CategoryGridCard;
