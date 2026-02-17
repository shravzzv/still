import EmptyTasksState from '@/components/empty-tasks-state'
import type { Task } from '@/types/task'
import { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  const isEmpty = tasks.length === 0

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
      <View className="flex-1 bg-surface px-8 py-0 text-surface-foreground dark:bg-surface-dark dark:text-surface-foreground-dark md:px-8 md:py-8">
        {isEmpty && <EmptyTasksState />}
      </View>
    </SafeAreaView>
  )
}

/**
 *
 */
