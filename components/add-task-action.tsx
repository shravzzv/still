import { GestureResponderEvent } from 'react-native'
import { Text } from './ui/text'

export default function AddTaskAction() {
  const handleAdd = (e: GestureResponderEvent) => {
    console.log('add')
  }

  return (
    <Text
      className="cursor-pointer font-medium text-primary"
      onPress={handleAdd}
    >
      Add
    </Text>
  )
}

/**
 *
 */
