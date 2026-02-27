import { useThemeContext } from '@/providers/theme-provider'
import type { Task } from '@/types/task'
import { Circle, CircleCheckBig, Pen, Trash } from 'lucide-react-native'
import { Platform, Pressable, View } from 'react-native'
import { Button } from './ui/button'
import { Text } from './ui/text'

interface TaskRowProps {
  task: Task
  toggleComplete: () => void
  onEdit: () => void
  onDelete: () => void
  onLongPress: () => void
}

export function TaskRow({
  task,
  toggleComplete,
  onEdit,
  onDelete,
  onLongPress,
}: TaskRowProps) {
  const { colors } = useThemeContext()

  return (
    <Pressable
      className="flex-row items-center gap-4 rounded-xl bg-surface-elevated p-4 dark:bg-surface-elevated-dark"
      onLongPress={onLongPress}
      testID="task-row"
    >
      <Button
        variant="ghost"
        className="shrink-0 cursor-pointer p-0"
        onPress={toggleComplete}
        accessibilityRole="button"
      >
        {task.completed ? (
          <CircleCheckBig color={colors.surfaceForeground} size={24} />
        ) : (
          <Circle color={colors.surfaceForeground} size={24} />
        )}
      </Button>

      <Text className={`${task.completed && 'line-through opacity-50'} flex-1`}>
        {task.title}
      </Text>

      {Platform.OS === 'web' && (
        <View className="shrink-0 flex-row items-center gap-2">
          <Button
            variant="ghost"
            className="shrink-0 cursor-pointer p-0"
            accessibilityRole="button"
            onPress={onEdit}
            testID="edit-button"
          >
            <Pen color={colors.surfaceForeground} size={20} />
          </Button>

          <Button
            variant="ghost"
            className="shrink-0 cursor-pointer p-0"
            accessibilityRole="button"
            onPress={onDelete}
            testID="delete-button"
          >
            <Trash color={colors.destructive} size={20} />
          </Button>
        </View>
      )}
    </Pressable>
  )
}
