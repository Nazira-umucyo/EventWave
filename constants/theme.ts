/**
 * EventWave design tokens — sourced directly from the Figma "Evenro" kit's
 * Color Palette and Typography reference sheets.
 *
 * The product is predominantly light-themed (white/off-white surfaces, near
 * black text, single orange accent), unlike a dark-mode app, so these are
 * used directly rather than branching on system color scheme.
 */

export const Colors = {
  // Primary
  primary: '#F76B10',
  primaryTint1: '#F8935A', // approx tints from the 4-step primary swatch
  primaryTint2: '#FAB48C',
  primaryTint3: '#FBD3BE',
  primaryDark: '#8C3700', // "Dark Orange"

  // Secondary
  yellow: '#FBBE47',
  blue: '#3E82F7',
  green: '#29D697',
  white: '#FFFFFF',
  grey: '#F0F0EE',
  grey2: '#E1E1E1',
  softDarkish: '#4A4D55',

  // Gradients / overlays (kit calls these "linear" fills)
  blackLinear: '#171924',
  buttonLinear: '#20222C',
  dividerLinear: 'rgba(32,34,44,0.2)',

  // Text
  textPrimary: '#20222C',
  textOnDark: '#FDFDFD',
  textMuted: '#6B6E76',
  textFaint: '#9A9CA3',
  placeholder: '#A6A8AE',

  // State
  info: '#2F80ED',
  success: '#27AE60',
  warning: '#E2B93B',
  error: '#EB5757',

  // Background
  background: '#FFFFFF',
  backgroundAlt: '#F0F0EE',
  surface: '#FFFFFF',
  border: '#E1E1E1',
  overlay: 'rgba(23,25,36,0.55)',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

/**
 * Typography scale, ported 1:1 from the Figma Typography sheet.
 * Typeface: Inter. React Native falls back to the system font since no
 * Inter font files were provided — swap in expo-font + Inter later if the
 * exact typeface match matters (see README "Fonts" section).
 */
export const Type = {
  h1: { fontSize: 32, lineHeight: 48, fontWeight: '600' as const },
  h2: { fontSize: 20, lineHeight: 30, fontWeight: '600' as const },
  h3: { fontSize: 18, lineHeight: 28, fontWeight: '600' as const },
  h4: { fontSize: 16, lineHeight: 22, fontWeight: '600' as const },
  h5: { fontSize: 14, lineHeight: 20, fontWeight: '600' as const },
  h6: { fontSize: 12, lineHeight: 16, fontWeight: '600' as const },

  body1: { fontSize: 14, lineHeight: 24, fontWeight: '400' as const },
  body2: { fontSize: 12, lineHeight: 22, fontWeight: '400' as const },
  body3: { fontSize: 12, lineHeight: 20, fontWeight: '500' as const },
  body4: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  body5: { fontSize: 10, lineHeight: 14, fontWeight: '400' as const },
  body6: { fontSize: 9, lineHeight: 10, fontWeight: '500' as const },

  button1: { fontSize: 14, lineHeight: 18, fontWeight: '600' as const },
  button2: { fontSize: 12, lineHeight: 20, fontWeight: '600' as const },
  button3: { fontSize: 10, lineHeight: 14, fontWeight: '600' as const },

  caption1: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  caption2: { fontSize: 14, lineHeight: 18, fontWeight: '400' as const },
  caption3: { fontSize: 12, lineHeight: 24, fontWeight: '600' as const },
  caption4: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
  caption5: { fontSize: 12, lineHeight: 12, fontWeight: '400' as const },
  caption6: { fontSize: 10, lineHeight: 14, fontWeight: '600' as const },
  caption7: { fontSize: 6, lineHeight: 10, fontWeight: '600' as const },
} as const;

// Kept for compatibility with any lingering imports from the default template.
export const Fonts = {
  sans: 'System',
  rounded: 'System',
  mono: 'System',
};
