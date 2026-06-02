// constants/styling.ts

/**
 * Semantic theme tokens
 * Source of truth for Still's design system.
 *
 * {@link tailwind} needs to be kept in sync with this if modified.
 */
export const themes = {
  light: {
    surface: '#F6F4EF',
    surfaceForeground: '#111827',
    surfaceElevated: '#FFFFFF',
    primary: '#111827',
    primaryForeground: '#FFFFFF',
    muted: '#6B7280',
    accent: '#6F8196',
    border: '#E5E7EB',
    destructive: '#DC2626',
    destructiveForeground: '#FFFFFF',
  },
  dark: {
    surface: '#0B0B0C',
    surfaceForeground: '#F9FAFB',
    surfaceElevated: '#3E403F',
    primary: '#F9FAFB',
    primaryForeground: '#0B0B0C',
    muted: '#9CA3AF',
    accent: '#8FA2B7',
    border: '#27272A',
    destructive: '#EF4444',
    destructiveForeground: '#0B0B0C',
  },
} as const

/**
 * Typography tokens
 */
export const typography = {
  body: 'Inter_400Regular',
  heading: 'Inter_600SemiBold',
  display: 'Inter_900Black',
} as const

/**
 * Tailwind adapter layer
 * (Tailwind never reads themes directly)
 */
export const tailwind = {
  colors: {
    surface: themes.light.surface,
    'surface-dark': themes.dark.surface,

    'surface-foreground': themes.light.surfaceForeground,
    'surface-foreground-dark': themes.dark.surfaceForeground,

    'surface-elevated': themes.light.surfaceElevated,
    'surface-elevated-dark': themes.dark.surfaceElevated,

    primary: themes.light.primary,
    'primary-dark': themes.dark.primary,

    'primary-foreground': themes.light.primaryForeground,
    'primary-foreground-dark': themes.dark.primaryForeground,

    muted: themes.light.muted,
    'muted-dark': themes.dark.muted,

    accent: themes.light.accent,
    'accent-dark': themes.dark.accent,

    border: themes.light.border,
    'border-dark': themes.dark.border,

    destructive: themes.light.destructive,
    'destructive-dark': themes.dark.destructive,

    'destructive-foreground': themes.light.destructiveForeground,
    'destructive-foreground-dark': themes.dark.destructiveForeground,
  },

  fontFamily: {
    sans: [typography.body],
    medium: [typography.heading],
    bold: [typography.display],
  },
} as const
