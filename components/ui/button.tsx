import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Pressable, PressableProps } from 'react-native'

/**
 * Button Variants Definition
 * Using CVA to manage the relationship between variant and size.
 */
const buttonVariants = cva(
  'items-center justify-center flex-row rounded-xl active:opacity-80 hover:opacity-80 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50', // Base styles
  {
    variants: {
      variant: {
        default: 'bg-primary dark:bg-primary-dark',
        outline:
          'bg-transparent border border-border dark:border-border-dark active:bg-muted/10',
        secondary:
          'bg-surface-elevated dark:bg-surface-elevated-dark border border-border dark:border-border-dark',
        ghost: 'bg-transparent active:bg-muted/10',
        destructive:
          'bg-destructive dark:bg-destructive-dark active:opacity-80',
      },
      size: {
        sm: 'py-1 px-2',
        md: 'py-1.5 px-3',
        lg: 'py-2 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

// Extract types directly from the CVA definition
type ButtonCvaProps = VariantProps<typeof buttonVariants>

type ButtonProps = PressableProps &
  ButtonCvaProps & {
    children: React.ReactNode
    className?: string
  }

/**
 * Button
 *
 * Base interactive surface for Still.
 * Wraps React Native `Pressable` and applies default layout,
 * spacing, and visual styling using NativeWind tokens.
 */
export function Button({
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Pressable>
  )
}
