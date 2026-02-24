import { useThemeContext } from '@/providers/theme-provider'
import { Plus, X } from 'lucide-react-native'
import { useState } from 'react'
import { Modal, TextInput, View } from 'react-native'
import { Button } from './ui/button'
import { Text } from './ui/text'

interface AddTaskActionProps {
  onSubmit: (title: string) => void
}

export default function AddTaskAction({ onSubmit }: AddTaskActionProps) {
  const [text, setText] = useState<string>('')
  const { colors, colorScheme } = useThemeContext()
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = () => {
    const value = text.trim()
    if (!value) return

    onSubmit(value)
    setText('')
    setShowModal(false)
  }

  return (
    <>
      <Button
        className="cursor-pointer rounded-full p-1"
        onPress={() => setShowModal(true)}
        accessibilityRole="button"
      >
        <Plus color={colors.primaryForeground} size={24} />
      </Button>

      <Modal
        visible={showModal}
        backdropColor={colors.surface}
        onRequestClose={() => setShowModal(false)}
        animationType="slide"
        transparent
      >
        <View
          className={`h-full w-full items-center justify-center px-8 backdrop-blur-sm ${colorScheme === 'dark' && 'dark'}`}
        >
          <View className="w-full max-w-sm items-stretch gap-4 rounded-xl border bg-surface px-4 py-2 dark:bg-surface-dark">
            <View className="flex-row items-center justify-between">
              <Text className="font-semibold">Add a task</Text>

              <Button
                variant="ghost"
                onPress={() => setShowModal(false)}
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
              placeholderTextColor={colors.primary}
              multiline
              className="rounded-xl border-border bg-surface-elevated px-4 py-2 text-base text-primary dark:bg-surface-elevated-dark dark:text-primary-dark"
            />

            <View className="flex-row justify-end gap-2">
              <Button
                onPress={() => setShowModal(false)}
                variant="outline"
                accessibilityRole="button"
              >
                <Text className="text-surface-foreground dark:text-surface-foreground-dark">
                  Cancel
                </Text>
              </Button>

              <Button onPress={handleSubmit} accessibilityRole="button">
                <Text className="text-primary-foreground dark:text-primary-foreground-dark">
                  Submit
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
