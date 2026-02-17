import ThemeToggle from '@/components/theme-toggle'
import { Text } from '@/components/ui/text'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
      <View className="flex-1 bg-surface px-8 py-0 dark:bg-surface-dark md:px-8 md:py-8">
        <ThemeToggle />

        <Text className="mt-auto text-center text-xs">
          &copy; Still {new Date().getFullYear()}
        </Text>
      </View>
    </SafeAreaView>
  )
}
