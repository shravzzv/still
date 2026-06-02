import { Button } from '@/components/ui/button'
import { useThemeContext } from '@/providers/theme-provider'
import type { ThemeMode } from '@/types/use-theme'
import { Monitor, Moon, Sun } from 'lucide-react-native'
import { View } from 'react-native'

const modes: { mode: ThemeMode; Icon: any }[] = [
  { mode: 'light', Icon: Sun },
  { mode: 'dark', Icon: Moon },
  { mode: 'system', Icon: Monitor },
]

export function ThemeToggle() {
  const { theme, updateTheme, colors } = useThemeContext()

  return (
    <View className="mx-auto flex-row rounded-xl border border-border p-1 dark:border-border-dark">
      {modes.map(({ mode, Icon }) => {
        const isActive = theme === mode
        return (
          <Button
            key={mode}
            variant={isActive ? 'default' : 'ghost'}
            size="sm"
            className="px-3"
            onPress={() => updateTheme(mode)}
            testID={`theme-${mode}`}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Icon
              size={16}
              color={
                isActive ? colors.primaryForeground : colors.surfaceForeground
              }
            />
          </Button>
        )
      })}
    </View>
  )
}
