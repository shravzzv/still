import { Text } from '@/components/ui/text'
import { render } from '@testing-library/react-native'

describe('Text', () => {
  it('renders children', () => {
    const { getByText } = render(<Text>Still</Text>)
    expect(getByText('Still')).toBeTruthy()
  })

  it('applies default classes', () => {
    const { getByText } = render(<Text>Still</Text>)
    const node = getByText('Still')
    expect(node.props.className).toContain('font-sans')
    expect(node.props.className).toContain('text-base')
  })

  it('merges custom className', () => {
    const { getByText } = render(<Text className="text-primary">Still</Text>)
    const node = getByText('Still')
    expect(node.props.className).toContain('text-primary')
  })

  it('forwards native props', () => {
    const { getByText } = render(<Text accessibilityLabel="label">Still</Text>)
    expect(getByText('Still').props.accessibilityLabel).toBe('label')
  })
})
