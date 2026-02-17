import '@/global.css'
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { View } from 'react-native'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_900Black,
  })
  const { colorScheme } = useColorScheme()

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <View className={colorScheme === 'dark' ? 'dark' : ''} style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  )
}
