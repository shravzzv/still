import ThemeToggle from '@/components/theme-toggle'
import { Screen } from '@/components/ui/screen'
import { Text } from '@/components/ui/text'

export default function Page() {
  return (
    <Screen>
      <ThemeToggle />

      <Text className="mt-auto text-center text-xs">
        &copy; Still {new Date().getFullYear()}
      </Text>
    </Screen>
  )
}
