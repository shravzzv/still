import { useThemeContext } from '@/providers/theme-provider'
import { Plus } from 'lucide-react-native'
import { Button } from './ui/button'

interface AddTaskActionProps {
  openModal: () => void
  disabled: boolean
}

export default function AddTaskAction({
  openModal,
  disabled,
}: AddTaskActionProps) {
  const { colors } = useThemeContext()

  return (
    <Button
      className="cursor-pointer rounded-full p-1"
      onPress={openModal}
      accessibilityRole="button"
      disabled={disabled}
    >
      <Plus color={colors.primaryForeground} size={24} />
    </Button>
  )
}
