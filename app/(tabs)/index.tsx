import EmptyTasksState from '@/components/empty-tasks-state'
import { Screen } from '@/components/ui/screen'
import type { Task } from '@/types/task'
import { useState } from 'react'

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  const isEmpty = tasks.length === 0

  return <Screen>{isEmpty && <EmptyTasksState />}</Screen>
}
