import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { fireEvent, render } from '@testing-library/react-native'
import { View } from 'react-native'

describe('Button', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Button>
        <Text>Begin</Text>
      </Button>,
    )
    expect(getByText('Begin')).toBeTruthy()
  })

  it('applies default classes', () => {
    const { getByRole } = render(
      <Button accessibilityRole="button">
        <Text>Begin</Text>
      </Button>,
    )
    expect(getByRole('button').props.className).toContain('bg-primary')
  })

  it('merges custom className', () => {
    const { getByRole } = render(
      <Button accessibilityRole="button" className="mt-4">
        <Text>Begin</Text>
      </Button>,
    )
    expect(getByRole('button').props.className).toContain('mt-4')
  })

  it('forwards press events', () => {
    const onPress = jest.fn()
    const { getByRole } = render(
      <Button accessibilityRole="button" onPress={onPress}>
        <Text>Begin</Text>
      </Button>,
    )
    fireEvent.press(getByRole('button'))
    expect(onPress).toHaveBeenCalled()
  })

  it('supports non-text children', () => {
    const { getByTestId } = render(
      <Button>
        <View testID="child" />
      </Button>,
    )
    expect(getByTestId('child')).toBeTruthy()
  })
})
