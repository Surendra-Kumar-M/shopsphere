/**
 * Color utilities.
 *
 * Helpers for deriving color values from design tokens
 * without scattering raw hex manipulation across the codebase.
 */

/**
 * Append an alpha channel to a hex color string.
 *
 * Supports 3-char (`#RGB`), 6-char (`#RRGGBB`), and 8-char (`#RRGGBBAA`) hex
 * inputs. Always returns an 8-char hex string (`#RRGGBBAA`).
 *
 * @param hex   - A hex color string (e.g. `"#4F46E5"` or `"#FFF"`)
 * @param alpha - An opacity value between `0` (transparent) and `1` (opaque)
 * @returns       The hex color with the requested alpha channel appended
 *
 * @example
 * ```ts
 * withAlpha("#4F46E5", 0.15); // "#4F46E526"
 * withAlpha("#FFF", 0.5);     // "#FFFFFF80"
 * ```
 */
export function withAlpha(hex: string, alpha: number): string {
  // Clamp alpha to [0, 1]
  const clampedAlpha = Math.min(1, Math.max(0, alpha));

  // Expand 3-char hex (#RGB → #RRGGBB)
  let normalizedHex = hex.replace(/^#/, "");

  if (normalizedHex.length === 3) {
    normalizedHex = normalizedHex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  // Strip any existing alpha channel (take first 6 chars only)
  normalizedHex = normalizedHex.substring(0, 6);

  // Convert alpha [0..1] → 2-digit hex [00..FF]
  const alphaHex = Math.round(clampedAlpha * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();

  return `#${normalizedHex.toUpperCase()}${alphaHex}`;
}
