'use client'

import type { Task } from '@still/types/task'
import { useEffect, useRef, useState } from 'react'
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
  editTaskTitle: (id: string, title: string) => void
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
  const hasHydratedRef = useRef(false)

  /**
   * Hydrate tasks from local storage on mount.
   */
  useEffect(() => {
    const hydrate = () => {
      try {
        const existingTasks = localStorage.getItem('tasks')
        if (!existingTasks) return

        setTasks(JSON.parse(existingTasks))
      } catch (error) {
        console.error('Error hydrating tasks', error)
      } finally {
        hasHydratedRef.current = true
      }
    }

    if (!hasHydratedRef.current) hydrate()
  }, [])

  /**
   * Sync tasks state with local storage on every change.
   * Race condition with hydration is guarded by a gate.
   */
  useEffect(() => {
    if (!hasHydratedRef.current) return
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

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

  const editTaskTitle = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task)),
    )
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleCompleteTask,
    editTaskTitle,
  }
}
