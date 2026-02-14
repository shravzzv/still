import EmptyTasksState from '@/components/empty-tasks-state'
import type { Task } from '@/types/task'
import { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  const isEmpty = tasks.length === 0

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-8 py-0 md:px-8 md:py-8">
        {isEmpty && <EmptyTasksState />}
      </View>
    </SafeAreaView>
  )
}

/**
 *
 */
