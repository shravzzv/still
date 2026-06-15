'use client'

import type { Task } from '@still/types/task'
import { openDB } from 'idb'

const DB_NAME = 'still'
const STORE_NAME = 'tasks'

let dbPromise: ReturnType<typeof openDB> | undefined

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        })
      },
    })
  }

  return dbPromise
}

/**
 * Gets all the tasks from the app's IndexedDB.
 */
export const getTasks = async (): Promise<Task[]> => {
  const db = await getDB()
  return db.getAll(STORE_NAME)
}

/**
 * Adds a task to the app's indexedDB.
 * @param task The task to be added to the db.
 */
export const createTask = async (task: Task): Promise<void> => {
  const db = await getDB()
  await db.add(STORE_NAME, task)
}

/**
 * Updates a task in the app's IndexedDB.
 * @param task The updated task.
 */
export const updateTask = async (task: Task): Promise<void> => {
  const db = await getDB()
  await db.put(STORE_NAME, task)
}

/**
 * Deletes a task from the app's IndexedDB.
 * @param id The id of the task to remove.
 */
export const deleteTask = async (id: string): Promise<void> => {
  const db = await getDB()
  await db.delete(STORE_NAME, id)
}
