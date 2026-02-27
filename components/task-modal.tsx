import { useThemeContext } from '@/providers/theme-provider'
import { X } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Modal, TextInput, View } from 'react-native'
import { Button } from './ui/button'
import { Text } from './ui/text'

interface TaskModalProps {
  taskTitle: string | null
  showModal: boolean
  onSubmit: (value: string) => void
  closeModal: () => void
}

export function TaskModal({
  showModal,
  taskTitle,
  closeModal,
  onSubmit,
}: TaskModalProps) {
  const { colors, colorScheme } = useThemeContext()
  const [text, setText] = useState<string>('')

  const handleSubmit = () => {
    const value = text.trim()
    if (!value) return

    onSubmit(value)
    setText('')
  }

  useEffect(() => {
    if (!showModal) return

    setText(taskTitle ?? '')
  }, [showModal, taskTitle])

  return (
    <Modal
      visible={showModal}
      backdropColor={colors.surface}
      onRequestClose={closeModal}
      animationType="slide"
      transparent
    >
      <View
        className={`h-full w-full items-center justify-center px-8 backdrop-blur-sm ${colorScheme === 'dark' && 'dark'}`}
      >
        <View
          className="absolute inset-0"
          style={{
            backgroundColor:
              colorScheme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0, .2)',
          }}
        />
        <View className="w-full max-w-sm items-stretch gap-4 rounded-xl bg-surface-elevated px-4 py-2 dark:bg-surface-elevated-dark">
          <View className="flex-row items-center justify-between">
            <Text className="font-medium">
              {taskTitle ? 'Edit' : 'Add'} a task
            </Text>

            <Button
              variant="ghost"
              onPress={closeModal}
              className="shrink-0 cursor-pointer p-0"
              accessibilityRole="button"
            >
              <X color={colors.primary} size={24} />
            </Button>
          </View>

          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="What's on your mind?"
            autoFocus
            maxLength={120}
            placeholderTextColor={colors.primary}
            multiline
            className="rounded-xl border-border bg-surface px-4 py-2 text-base text-surface-foreground dark:bg-surface-dark dark:text-surface-foreground-dark"
          />

          <View className="flex-row justify-end gap-2">
            <Button
              onPress={closeModal}
              variant="outline"
              accessibilityRole="button"
            >
              <Text className="text-surface-foreground dark:text-surface-foreground-dark">
                Cancel
              </Text>
            </Button>

            <Button
              onPress={handleSubmit}
              accessibilityRole="button"
              accessibilityLabel="submit"
              disabled={!text.trim()}
            >
              <Text className="text-primary-foreground dark:text-primary-foreground-dark">
                Submit
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}
