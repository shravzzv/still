import { Screen } from '@/components/ui/screen'
import { Text } from '@/components/ui/text'
import { Link } from 'expo-router'
import { View } from 'react-native'

export default function Page() {
  return (
    <Screen className="items-center justify-center">
      <View className="max-w-sm items-center gap-4">
        <Text
          className="text-center font-medium text-2xl"
          accessibilityRole="header"
        >
          Page not found
        </Text>

        <Text className="text-center text-sm text-muted dark:text-muted-dark">
          The link might be broken or the page may have moved.
        </Text>

        <Link href="/" asChild>
          <Text className="text-primary underline underline-offset-2 dark:text-primary-dark">
            Back to home
          </Text>
        </Link>
      </View>
    </Screen>
  )
}
