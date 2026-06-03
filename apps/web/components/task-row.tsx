'use client'

import { cn } from '@/lib/utils'
import { Task } from '@still/types/task'
import { Circle, CircleCheck, Trash } from 'lucide-react'
import EditTask from './edit-task'
import { Button } from './ui/button'

interface TaskRowProps {
  task: Task
  toggleComplete: () => void
  deleteTask: () => void
  editTitle: (id: string, title: string) => void
}

export default function TaskRow({
  task,
  toggleComplete,
  deleteTask,
  editTitle,
}: TaskRowProps) {
  return (
    <div className="bg-accent flex flex-row items-center justify-between gap-2 rounded-xl px-2 py-1">
      <Button
        variant="ghost"
        size="icon-lg"
        onClick={toggleComplete}
        className="cursor-pointer"
      >
        {task.completed ? (
          <CircleCheck className="size-6" />
        ) : (
          <Circle className="size-6" />
        )}
      </Button>

      <p
        className={cn(
          task.completed && 'text-muted-foreground line-through',
          'flex-1',
        )}
      >
        {task.title}
      </p>

      <div>
        <EditTask
          title={task.title}
          submitTask={(title: string) => editTitle(task.id, title)}
        />

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={deleteTask}
          className="cursor-pointer"
        >
          <Trash className="text-destructive" />
        </Button>
      </div>
    </div>
  )
}
