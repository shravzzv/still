'use client'

import {
  createTask,
  deleteTask as deleteTaskFromDB,
  getTasks,
  updateTask,
} from '@/lib/db'
import type { Task } from '@still/types/task'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface UseTasksResult {
  /**
   * Current collection of tasks managed by the hook.
   */
  tasks: Task[]

  /**
   * Whether the hook is loading tasks from the db.
   */
  isLoading: boolean

  /**
   * Creates a new incomplete task with the supplied title.
   */
  addTask: (title: string) => Promise<void>

  /**
   * Permanently removes a task.
   */
  deleteTask: (id: string) => Promise<void>

  /**
   * Toggles the completion state of a task.
   */
  toggleCompleteTask: (id: string) => Promise<void>

  /**
   * Updates the title of an existing task.
   */
  editTaskTitle: (id: string, title: string) => Promise<void>
}

/**
 * Manages the application's task collection and provides
 * operations for creating, updating, completing, and deleting tasks.
 *
 * Encapsulates task state and exposes a simple CRUD-oriented API
 * for UI components.
 *
 * @returns The current task collection and task management operations.
 */
export const useTasks = (): UseTasksResult => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Hydrate tasks from IndexedDB on mount.
   */
  useEffect(() => {
    const hydrate = async () => {
      try {
        const existingTasks = await getTasks()
        setTasks(existingTasks)
      } catch (error) {
        console.error('Error hydrating tasks', error)
      } finally {
        setIsLoading(false)
      }
    }

    hydrate()
  }, [])

  const addTask = async (title: string) => {
    const task: Task = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    await createTask(task)
    setTasks((prev) => [...prev, task])
  }

  const deleteTask = async (id: string) => {
    await deleteTaskFromDB(id)
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleCompleteTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : undefined,
    }

    await updateTask(updatedTask)
    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)))
  }

  const editTaskTitle = async (id: string, title: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    const updatedTask = { ...task, title }

    await updateTask(updatedTask)
    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)))
  }

  return {
    tasks,
    isLoading,
    addTask,
    deleteTask,
    editTaskTitle,
    toggleCompleteTask,
  }
}
