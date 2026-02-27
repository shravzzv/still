import { cn } from '@/lib/utils'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

type TextProps = RNTextProps & {
  className?: string
}

/**
 * Text
 *
 * Base typography primitive for Still.
 * Wraps React Native `Text` and applies the default font and body sizing.
 *
 * Prefer this component over react-native Text unless intentionally
 * bypassing the design system.
 */
export function Text({ className, ...props }: TextProps) {
  return (
    <RNText
      className={cn(
        'font-sans text-base text-surface-foreground dark:text-surface-foreground-dark',
        className,
      )}
      {...props}
    />
  )
}
