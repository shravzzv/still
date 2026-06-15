import { UseTasksResult } from '@/hooks/use-tasks'
import TaskRow from './task-row'
import { Spinner } from './ui/spinner'

type TasksSectionProps = Omit<UseTasksResult, 'addTask'>

export default function TasksSection({
  tasks,
  isLoading,
  deleteTask,
  editTaskTitle,
  toggleCompleteTask,
}: TasksSectionProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Spinner />
        <span>Loading...</span>
      </div>
    )
  }

  const isEmpty = tasks.length === 0

  if (isEmpty) {
    return (
      <p className="text-muted-foreground text-center text-sm">
        No tasks. Breathe.
      </p>
    )
  }

  return (
    <section className="mx-auto w-full max-w-2xl space-y-2 px-4">
      {tasks.map((task) => (
        <TaskRow
          task={task}
          key={task.id}
          editTitle={editTaskTitle}
          deleteTask={() => deleteTask(task.id)}
          toggleComplete={() => toggleCompleteTask(task.id)}
        />
      ))}
    </section>
  )
}
