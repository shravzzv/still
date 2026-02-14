import { Text } from '@/components/ui/text'
import { Link } from 'expo-router'
import { View } from 'react-native'

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">There&apos;s nothing here</Text>

      <Link href="/" className="underline underline-offset-2" asChild>
        <Text>Go to home</Text>
      </Link>
    </View>
  )
}
