import { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
} from "react-native";
import { Href, useRouter } from "expo-router";

import { AppText, Button, Screen } from "@/components/ui";

import { ONBOARDING_SLIDES } from "@/constants/auth";
import { useAuth } from "@/hooks/useAuth";

import * as S from "./styles";

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<(typeof ONBOARDING_SLIDES)[number]>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (isLastSlide) {
      completeOnboarding();
      router.replace("/login" as Href);
      return;
    }

    listRef.current?.scrollToIndex({
      index: activeIndex + 1,
      animated: true,
    });
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace("/login" as Href);
  };

  return (
    <Screen safeArea padding={false}>
      <S.TopBar>
        <Button title="Skip" variant="ghost" onPress={handleSkip} />
      </S.TopBar>

      <FlatList
        ref={listRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <S.Slide width={width}>
            <S.Illustration>
              <AppText variant="hero" weight="bold" color="primary">
                {item.title.charAt(0)}
              </AppText>
            </S.Illustration>

            <AppText variant="h1" weight="bold" align="center">
              {item.title}
            </AppText>

            <S.Description>
              <AppText variant="body" color="textSecondary" align="center">
                {item.description}
              </AppText>
            </S.Description>
          </S.Slide>
        )}
      />

      <S.Footer>
        <S.Dots>
          {ONBOARDING_SLIDES.map((slide, index) => (
            <S.Dot key={slide.id} active={index === activeIndex} />
          ))}
        </S.Dots>

        <Button
          title={isLastSlide ? "Get Started" : "Next"}
          fullWidth
          onPress={handleNext}
        />
      </S.Footer>
    </Screen>
  );
}
