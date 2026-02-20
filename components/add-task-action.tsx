import { GestureResponderEvent } from 'react-native'
import { Text } from './ui/text'

export default function AddTaskAction() {
  const handleAdd = (e: GestureResponderEvent) => {
    console.log('add')
  }

  return (
          className={`h-full w-full items-center justify-center px-8 backdrop-blur-lg ${colorScheme === 'dark' && 'dark'}`}
    </Text>
  )
}
