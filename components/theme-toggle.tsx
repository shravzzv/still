import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useTheme } from '@/hooks/use-theme'
import { View } from 'react-native'

type Mode = 'light' | 'dark' | 'system'
const modes: Mode[] = ['light', 'dark', 'system']

export default function ThemeToggle() {
  const { theme, updateTheme } = useTheme()

  return (
    <View className="mx-auto w-max flex-row items-center justify-center gap-2 rounded-xl border border-border p-1 px-4 py-2 dark:border-border-dark">
      <Text>Theme:</Text>

      {modes.map((mode) => {
        const active = theme === mode

        return (
          <Button
            key={mode}
            variant={active ? 'primary' : 'ghost'}
            size="sm"
            onPress={() => updateTheme(mode)}
          >
            <Text
              className={
                active
                  ? 'text-primary-foreground dark:text-primary-foreground-dark'
                  : undefined
              }
            >
              {mode}
            </Text>
          </Button>
        )
      })}
    </View>
  )
}
