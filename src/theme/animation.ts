/**
 * Animation timing tokens.
 *
 * Centralized duration and spring configuration values for
 * consistent motion across the application.
 *
 * NOTE: These are tokens only. Actual animated components
 * are not introduced in this phase.
 */
export const Animation = {
  /** Durations in milliseconds */
  duration: {
    /** Quick micro-interactions (opacity, scale) */
    fast: 150,
    /** Standard transitions (slide, fade) */
    normal: 250,
    /** Slow transitions (page-level, complex sequences) */
    slow: 350,
  },

  /** Spring presets for react-native-reanimated / Animated.spring */
  spring: {
    /** Snappy — buttons, toggles */
    snappy: {
      damping: 15,
      stiffness: 200,
      mass: 1,
    },
    /** Gentle — cards, sheets */
    gentle: {
      damping: 20,
      stiffness: 150,
      mass: 1,
    },
    /** Bouncy — playful emphasis */
    bouncy: {
      damping: 10,
      stiffness: 180,
      mass: 1,
    },
  },
} as const;
