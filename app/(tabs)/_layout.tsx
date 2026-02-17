import AddTaskAction from '@/components/add-task-action'
import { typography } from '@/constants/styling'
import { useThemeContext } from '@/providers/theme-provider'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { View } from 'react-native'

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
          headerRight: () => (
            <View className="mr-4">
              <AddTaskAction />
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

/**
 *
 */
