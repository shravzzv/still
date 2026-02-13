import { AppText } from '@/components/app-text'
import { View } from 'react-native'

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center space-y-4 bg-surface px-8">
      <AppText className="text-2xl font-semibold text-primary underline">
        Still water
      </AppText>
      <AppText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos repudiandae
        sapiente exercitationem perspiciatis dolore. Quasi nobis ut officia iste
        et delectus vitae eius velit molestias natus. Maiores facere minima
        harum.
      </AppText>
    </View>
  )
}
