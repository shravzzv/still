import AddTaskAction from '@/components/add-task-action'
import EmptyTasksState from '@/components/empty-tasks-state'
import TaskModal from '@/components/task-modal'
import TaskRow from '@/components/task-row'
import { Screen } from '@/components/ui/screen'
import type { Task } from '@/types/task'
import * as Crypto from 'expo-crypto'
import { useNavigation } from 'expo-router'
import { useCallback, useLayoutEffect, useState } from 'react'
import { FlatList, View } from 'react-native'

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
  const [showModal, setShowModal] = useState<boolean>(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const navigation = useNavigation()

  const toggleComplete = (id: string) => {
    const now = new Date().toISOString()

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task
        const nextCompleted = !task.completed

        return {
          ...task,
          completed: nextCompleted,
          completedAt: nextCompleted ? now : undefined,
        }
      }),
    )
  }

  const addTask = (title: string) => {
    const now = new Date().toISOString()

    const newTask: Task = {
      id: Crypto.randomUUID(),
      title,
      completed: false,
      createdAt: now,
    }

    setTasks((prev) => [...prev, newTask])
  }

  const editTitle = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task)),
    )
  }

  const openModal = useCallback((taskId?: string) => {
    setEditingTaskId(taskId ?? null)
    setShowModal(true)
  }, [])

  const closeModal = () => setShowModal(false)

  const submitModal = (title: string) => {
    if (editingTaskId) {
      editTitle(editingTaskId, title)
      setEditingTaskId(null)
      closeModal()
      return
    }

    addTask(title)
    closeModal()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="mr-4">
          <AddTaskAction openModal={() => openModal()} disabled={showModal} />
        </View>
      ),
    })
  }, [navigation, openModal, showModal])

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
            onEdit={() => openModal(task.item.id)}
          />
        )}
      />

      <TaskModal
        showModal={showModal}
        onSubmit={(value) => submitModal(value)}
        closeModal={closeModal}
        taskTitle={
          tasks.find((task) => task.id === editingTaskId)?.title ?? null
        }
      />
    </Screen>
  )
}
