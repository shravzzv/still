import { Pressable, PressableProps } from 'react-native'

type ButtonVariant = 'primary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = PressableProps & {
  children: React.ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary dark:bg-primary-dark',
  ghost: '',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-1',
  md: 'px-4 py-1.5',
  lg: 'px-6 py-2',
}

/**
 * Button
 *
 * Base interactive surface for Still.
 * Wraps React Native `Pressable` and applies default layout,
 * spacing, and visual styling using NativeWind tokens.
 *
 * This component is intentionally minimal:
 * - Does not enforce typography (compose with `Text`).
 * - Accepts arbitrary children for flexible layouts.
 *
 * Props:
 * - `variant` controls visual tone (e.g. primary, subtle).
 * - `size` controls padding and density.
 *
 * Prefer this over raw `Pressable` for consistent interaction
 * styling across the app.
 */
export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={[
        'items-center justify-center rounded-xl',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Pressable>
  )
}
