'use client'

import AddTask from '@/components/add-task'
import TaskRow from '@/components/task-row'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTasks } from '@/hooks/use-tasks'

export default function Page() {
  const { tasks, addTask, deleteTask, toggleCompleteTask, editTaskTitle } =
    useTasks()

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-row items-center justify-center gap-2">
        <AddTask submitTask={addTask} />
        <ThemeToggle />
      </div>

      <section className="mx-auto w-full max-w-2xl space-y-2 px-4">
        {tasks.map((task) => (
          <TaskRow
            task={task}
            key={task.id}
            toggleComplete={() => toggleCompleteTask(task.id)}
            deleteTask={() => deleteTask(task.id)}
            editTitle={editTaskTitle}
          />
        ))}

        {tasks.length === 0 && (
          <p className="text-muted-foreground text-center text-sm">
            No tasks. Breathe.
          </p>
        )}
      </section>
    </div>
  )
}
