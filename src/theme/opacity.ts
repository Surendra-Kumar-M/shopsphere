/**
 * Opacity design tokens.
 *
 * Centralized opacity values used throughout the design system
 * for interaction states, overlays, and muted content.
 */
export const Opacity = {
  /** Disabled elements (buttons, inputs, etc.) */
  disabled: 0.5,
  /** Pressed/active state feedback */
  pressed: 0.7,
  /** Modal/dialog backdrop overlay */
  overlay: 0.5,
  /** Muted/de-emphasized content */
  muted: 0.85,
} as const;
