import { cn } from '@/lib/utils'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ScreenProps {
  children: React.ReactNode
  className?: string
}

/**
 * Screen
 *
 * Base layout wrapper for Still screens.
 *
 * Responsibilities:
 * - applies safe-area padding
 * - sets surface background
 * - provides consistent page padding + flex layout
 *
 * Prefer this over manually composing `SafeAreaView` + `View`
 * in each route file.
 */
export function Screen({ children, className }: ScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
      <View
        className={cn(
          'flex-1 bg-surface px-8 py-0 dark:bg-surface-dark md:px-8 md:py-8',
          className,
        )}
      >
        {children}
      </View>
    </SafeAreaView>
  )
}
