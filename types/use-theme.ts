export interface UseThemeResult {
  /**
   * Current theme mode selected by the user.
   *
   * - 'system' → follows OS appearance
   * - 'light'  → forces light theme
   * - 'dark'   → forces dark theme
   *
   * Use this when building settings UI or displaying
   * the current preference.
   */
  theme: 'light' | 'dark' | 'system'

  /**
   * Resolved color tokens for the active palette.
   *
   * Always returns either the light or dark theme object,
   * regardless of whether `mode` is 'system'.
   *
   * Prefer this for:
   * - navigation styling
   * - inline JS styles
   */
  colors: Record<string, string>

  /**
   * Updates the theme mode.
   *
   * Persists automatically and updates NativeWind
   * so `dark:` classes react immediately.
   */
  changeTheme: (theme: 'light' | 'dark' | 'system') => void

  /**
   * Toggles between light and dark modes.
   *
   * If the current mode is 'system', this will switch
   * to an explicit theme based on the resolved palette.
   */
  toggleTheme: () => void
}
