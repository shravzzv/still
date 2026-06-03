'use client'

import { data } from '@/data/tasks'
import type { Task } from '@still/types/task'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface UseTasksResult {
  /**
   * Current collection of tasks managed by the hook.
   */
  tasks: Task[]

  /**
   * Creates a new incomplete task with the supplied title.
   */
  addTask: (title: string) => void

  /**
   * Permanently removes a task.
   */
  deleteTask: (id: string) => void

  /**
   * Toggles the completion state of a task.
   */
  toggleCompleteTask: (id: string) => void

  /**
   * Updates the title of an existing task.
   */
  editTitle: (id: string, title: string) => void
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
  const [tasks, setTasks] = useState<Task[]>(data)

  const addTask = (title: string) =>
    setTasks((prev) => [
      ...prev,
      {
        title,
        id: uuidv4(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ])

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleCompleteTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed
                ? new Date().toISOString()
                : undefined,
            }
          : task,
      ),
    )
  }

  const editTitle = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task)),
    )
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleCompleteTask,
    editTitle,
  }
}
