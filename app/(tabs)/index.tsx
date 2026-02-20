import EmptyTasksState from '@/components/empty-tasks-state'
import TaskRow from '@/components/task-row'
import { Screen } from '@/components/ui/screen'
import type { Task } from '@/types/task'
import { useState } from 'react'
import { FlatList } from 'react-native'

const intialState: Task[] = [
  ...Array.from({ length: 0 }, (_, i) => ({
    id: `temp-${i}`,
    title: `Task ${i + 1}: Check if scrolling is smooth`,
    completed: i % 3 === 0,
    createdAt: '',
  })),
  { id: '1', title: 'Breathe', completed: false, createdAt: '' },
  { id: '2', title: 'Drink water', completed: true, createdAt: '' },
  { id: '3', title: 'Step outside', completed: false, createdAt: '' },
]

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>(intialState)

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  return (
    <Screen>
      <FlatList
        className="w-full rounded-xl"
        contentContainerClassName="w-full mx-auto max-w-2xl flex flex-col gap-2 rounded-xl"
        ListEmptyComponent={<EmptyTasksState />}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={(task) => (
          <TaskRow
            task={task.item}
            toggleComplete={() => toggleComplete(task.item.id)}
          />
        )}
      />
    </Screen>
  )
}
