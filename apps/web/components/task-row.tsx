'use client'

import { cn } from '@/lib/utils'
import { Task } from '@still/types/task'
import { Circle, CircleCheck, Pen, Trash } from 'lucide-react'
import { Button } from './ui/button'

interface TaskRowProps {
  task: Task
  toggleComplete: () => void
  deleteTask: () => void
}

export default function TaskRow({
  task,
  toggleComplete,
  deleteTask,
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
        <Button variant="ghost" size="icon-sm" className="cursor-pointer">
          <Pen />
        </Button>

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
