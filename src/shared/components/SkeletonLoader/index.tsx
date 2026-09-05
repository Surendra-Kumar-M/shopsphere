import { useEffect } from "react";
import { useTheme } from "@emotion/react";

import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import * as S from "./styles";

import { DEFAULT_SKELETON, SHIMMER_DURATION, SkeletonProps } from "./types";

export default function SkeletonLoader({
  width = DEFAULT_SKELETON.width,

  height = DEFAULT_SKELETON.height,

  radius = DEFAULT_SKELETON.radius,
}: SkeletonProps) {
  const theme = useTheme();

  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: SHIMMER_DURATION,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [-1, 1], [-300, 300]),
      },
    ],
  }));

  return (
    <S.Container width={width} height={height} radius={radius}>
      <Animated.View
        style={[
          animatedStyle,
          {
            flex: 1,
          },
        ]}>
        <LinearGradient
          colors={["transparent", theme.colors.white + "55", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
          }}
        />
      </Animated.View>
    </S.Container>
  );
}
