'use client'

import AddTask from '@/components/add-task'
import PWAInstallButton from '@/components/pwa-install-button'
import TasksSection from '@/components/tasks-section'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTasks } from '@/hooks/use-tasks'

export default function Page() {
  const {
    tasks,
    isLoading,
    addTask,
    deleteTask,
    editTaskTitle,
    toggleCompleteTask,
  } = useTasks()

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-row items-center justify-center gap-2">
        <AddTask submitTask={addTask} />
        <ThemeToggle />
        <PWAInstallButton />
      </div>

      <TasksSection
        tasks={tasks}
        isLoading={isLoading}
        deleteTask={deleteTask}
        editTaskTitle={editTaskTitle}
        toggleCompleteTask={toggleCompleteTask}
      />
    </div>
  )
}
