import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
} from "react-native";
import { Href, useRouter } from "expo-router";
import { useTheme } from "@emotion/react";

import { AppText, Button, Screen } from "@/shared/components";
import { Animation } from "@/theme/animation";
import { ONBOARDING_SLIDES } from "@/constants/auth";
import { useAuth } from "@/hooks/useAuth";

import * as S from "./styles";

const AnimatedDot = ({ active }: { active: boolean }) => {
  const theme = useTheme();
  const [width] = useState(() => new Animated.Value(active ? 24 : 8));
  const [color] = useState(() => new Animated.Value(active ? 1 : 0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(width, {
        toValue: active ? 24 : 8,
        duration: Animation.duration.normal,
        useNativeDriver: false,
      }),
      Animated.timing(color, {
        toValue: active ? 1 : 0,
        duration: Animation.duration.normal,
        useNativeDriver: false,
      }),
    ]).start();
  }, [active, width, color]);

  const backgroundColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, theme.colors.primary],
  });

  return (
    <Animated.View
      style={{
        height: 8,
        width,
        borderRadius: theme.radius.full,
        backgroundColor,
      }}
      accessibilityRole="none"
      importantForAccessibility="no"
    />
  );
};

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
        {!isLastSlide ? (
          <Button
            title="Skip"
            variant="ghost"
            onPress={handleSkip}
            accessibilityLabel="Skip onboarding"
            accessibilityRole="button"
          />
        ) : null}
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
        accessibilityRole="adjustable"
        accessibilityLabel="Onboarding pages"
        renderItem={({ item }) => (
          <S.Slide width={width}>
            <S.Illustration
              accessible={false}
              importantForAccessibility="no-hide-descendants"
            >
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
        <S.Dots
          accessibilityRole="progressbar"
          accessibilityValue={{
            min: 1,
            max: ONBOARDING_SLIDES.length,
            now: activeIndex + 1,
          }}
          accessibilityLabel={`Page ${activeIndex + 1} of ${ONBOARDING_SLIDES.length}`}
        >
          {ONBOARDING_SLIDES.map((slide, index) => (
            <AnimatedDot key={slide.id} active={index === activeIndex} />
          ))}
        </S.Dots>

        <Button
          title={isLastSlide ? "Get Started" : "Next"}
          fullWidth
          onPress={handleNext}
          accessibilityLabel={isLastSlide ? "Complete onboarding and get started" : "Go to next slide"}
        />
      </S.Footer>
    </Screen>
  );
}
