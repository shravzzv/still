import { AddTaskAction } from '@/components/add-task-action'
import { EmptyTasksState } from '@/components/empty-tasks-state'
import { TaskModal } from '@/components/task-modal'
import { TaskRow } from '@/components/task-row'
import { Screen } from '@/components/ui/screen'
import { useThemeContext } from '@/providers/theme-provider'
import type { Task } from '@/types/task'
import { useActionSheet } from '@expo/react-native-action-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'
import { useNavigation } from 'expo-router'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { FlatList, View } from 'react-native'

const STORAGE_KEY = 'still:tasks'

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const navigation = useNavigation()
  const { showActionSheetWithOptions } = useActionSheet()
  const { colors } = useThemeContext()
  const hydrationRef = useRef<boolean>(false)

  useEffect(() => {
    const hydrate = async () => {
      const prev = await AsyncStorage.getItem(STORAGE_KEY)

      if (prev) {
        try {
          setTasks(JSON.parse(prev))
        } catch (error) {
          console.warn('Failed to parse stored tasks', error)
          setTasks([])
        }
      }

      hydrationRef.current = true
    }

    hydrate()
  }, [])

  useEffect(() => {
    if (!hydrationRef.current) return

    const sync = async () => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }

    sync()
  }, [tasks])

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

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
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

  const openTaskActions = (task: Task) => {
    showActionSheetWithOptions(
      {
        options: ['Edit task', 'Delete task', 'Cancel'],
        title: task.title,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,

        tintColor: colors.primary,
        destructiveColor: colors.destructive,

        textStyle: { color: colors.surfaceForeground },
        titleTextStyle: { color: colors.muted, fontSize: 12 },

        containerStyle: {
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          paddingBottom: 12,
          backgroundColor: colors.surfaceElevated,
        },
      },
      (index) => {
        if (index === 0) openModal(task.id)
        if (index === 1) deleteTask(task.id)
      },
    )
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
        contentContainerClassName="w-full mx-auto max-w-2xl gap-2 rounded-xl flex-1"
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <EmptyTasksState />
          </View>
        )}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskRow
            task={item}
            toggleComplete={() => toggleComplete(item.id)}
            onEdit={() => openModal(item.id)}
            onDelete={() => deleteTask(item.id)}
            onLongPress={() => openTaskActions(item)}
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
