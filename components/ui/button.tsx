import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Pressable, PressableProps } from 'react-native'

/**
 * Button Variants Definition
 * Using CVA to manage the relationship between variant and size.
 */
const buttonVariants = cva(
  'items-center justify-center flex-row rounded-xl', // Base styles
  {
    variants: {
      variant: {
        primary: 'bg-primary dark:bg-primary-dark active:opacity-80',
        ghost: 'bg-transparent active:bg-muted/10',
      },
      size: {
        sm: 'py-1 px-2',
        md: 'px-5',
        lg: 'px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
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
