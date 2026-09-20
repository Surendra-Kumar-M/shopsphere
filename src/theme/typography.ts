/**
 * Typography design tokens.
 *
 * `sizes` — raw font-size values consumed by component variant maps.
 * `fontWeight` — numeric weight tokens (typed for React Native).
 * `lineHeight` — multiplier-based scale applied to font sizes.
 * `fontFamily` — font-family tokens (system default; swap for a custom font later).
 * `letterSpacing` — tracking tokens for fine-grained adjustments.
 */

/** Font-size scale (preserved from original) */
export const Typography = {
  hero: 32,
  h1: 28,
  h2: 24,
  h3: 20,

  title: 18,

  body: 16,
  bodySmall: 14,

  caption: 12,

  button: 16,
} as const;

/** Numeric font-weight tokens matching React Native's accepted string values. */
export const FontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

/**
 * Line-height multipliers.
 *
 * Usage: `lineHeight = fontSize * LineHeight.normal`
 * Alternatively, the `TEXT_VARIANTS` map in AppText already defines absolute
 * line-heights per variant. These multipliers are available for ad-hoc usage.
 */
export const LineHeight = {
  /** Tight — headings, display text */
  tight: 1.2,
  /** Normal — body text, general content */
  normal: 1.5,
  /** Relaxed — large blocks of readable text */
  relaxed: 1.75,
} as const;

/**
 * Font-family tokens.
 *
 * Currently set to `undefined` which falls back to the platform-default
 * system font. Replace the values with a custom font family name
 * (e.g. "Inter_400Regular") after loading fonts via `expo-font`.
 */
export const FontFamily = {
  regular: undefined,
  medium: undefined,
  semibold: undefined,
  bold: undefined,
} as const;

/**
 * Letter-spacing tokens (in density-independent pixels).
 *
 * Negative values tighten large headings; positive values open up small text.
 */
export const LetterSpacing = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
} as const;
