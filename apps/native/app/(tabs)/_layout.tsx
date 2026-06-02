import { typography } from '@/constants/styling'
import { useThemeContext } from '@/providers/theme-provider'
import { Tabs } from 'expo-router'
import { Home, Settings } from 'lucide-react-native'

export default function TabLayout() {
  const { colors } = useThemeContext()

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.primary,
        headerStyle: {
          backgroundColor: colors.surface,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colors.surface,
        },
        headerTitleStyle: {
          fontSize: 20,
          color: colors.primary,
          fontFamily: typography.heading,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Still',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
        }}
      />
    </Tabs>
  )
}
