import { useCallback, useRef } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
} from "react-native";

import { ProductGalleryProps } from "./types";
import * as S from "./styles";

export default function ProductGallery({
  images,
  selectedIndex,
  onSelectImage,
}: ProductGalleryProps) {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<string>>(null);

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / width);

      onSelectImage(index);
    },
    [onSelectImage, width],
  );

  const handleThumbnailPress = useCallback(
    (index: number) => {
      onSelectImage(index);
      listRef.current?.scrollToIndex({ index, animated: true });
    },
    [onSelectImage],
  );

  return (
    <S.Container>
      <FlatList
        ref={listRef}
        horizontal
        pagingEnabled
        bounces={false}
        data={images}
        keyExtractor={(item, index) => `${item}-${index}`}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <S.MainImageWrapper style={{ width }}>
            <S.MainImage source={{ uri: item }} contentFit="contain" />
          </S.MainImageWrapper>
        )}
      />

      {images.length > 1 ? (
        <>
          <S.ThumbnailList>
            {images.map((image, index) => (
              <S.ThumbnailButton
                key={`${image}-thumb-${index}`}
                selected={selectedIndex === index}
                onPress={() => handleThumbnailPress(index)}
                accessibilityRole="button"
                accessibilityLabel={`View image ${index + 1}`}>
                <S.ThumbnailImage source={{ uri: image }} contentFit="cover" />
              </S.ThumbnailButton>
            ))}
          </S.ThumbnailList>

          <S.Dots>
            {images.map((_, index) => (
              <S.Dot key={`dot-${index}`} active={selectedIndex === index} />
            ))}
          </S.Dots>
        </>
      ) : null}
    </S.Container>
  );
}
