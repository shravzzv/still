/**
 * Theme preference selected by the user.
 *
 * - 'light'  → forces light appearance
 * - 'dark'   → forces dark appearance
 * - 'system' → follows OS theme automatically
 */
export type ThemeMode = 'light' | 'dark' | 'system'

export interface UseThemeResult {
  /**
   * Current theme preference selected by the user.
   *
   * This reflects the chosen mode, not the resolved palette.
   */
  theme: ThemeMode

  /**
   * Resolved semantic color tokens.
   *
   * Always corresponds to either the light or dark palette,
   * even when `theme` is 'system'.
   *
   * Use this for:
   * - navigation styling
   * - inline JS styles
   */
  colors: Record<string, string>

  /**
   * The actual visual state currently rendered on the device.
   * This value is native to nativewind.
   * Unlike `theme`, this is never 'system'. It resolves to 'light' or 'dark'
   * based on the user's preference AND the OS setting.
   *
   * Use this for:
   * - Conditional logic in JS (e.g., re-injecting 'dark' classes in Modals)
   * - Determining which variant of a component to render manually
   */
  colorScheme: 'light' | 'dark' | undefined

  /**
   * Updates the theme preference.
   *
   * Persists automatically and updates NativeWind so
   * `dark:` classes react immediately.
   */
  updateTheme: (theme: ThemeMode) => void
}
