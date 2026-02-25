import { ThemeToggle } from '@/components/theme-toggle'
import { useThemeContext } from '@/providers/theme-provider'
import { fireEvent, render } from '@testing-library/react-native'

jest.mock('@/providers/theme-provider')

const mockedUseTheme = useThemeContext as jest.Mock

describe('ThemeToggle', () => {
  const updateTheme = jest.fn()

  beforeEach(() => {
    mockedUseTheme.mockReturnValue({
      theme: 'light',
      updateTheme,
      colors: {
        primaryForeground: '#fff',
        surfaceForeground: '#000',
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders light, dark and system theme buttons', () => {
    const { getByTestId } = render(<ThemeToggle />)

    expect(getByTestId('theme-light')).toBeTruthy()
    expect(getByTestId('theme-dark')).toBeTruthy()
    expect(getByTestId('theme-system')).toBeTruthy()
  })

  it('calls updateTheme when a button is pressed', () => {
    const { getByTestId } = render(<ThemeToggle />)

    fireEvent.press(getByTestId('theme-dark'))
    expect(updateTheme).toHaveBeenCalledWith('dark')

    fireEvent.press(getByTestId('theme-system'))
    expect(updateTheme).toHaveBeenCalledWith('system')

    fireEvent.press(getByTestId('theme-light'))
    expect(updateTheme).toHaveBeenCalledWith('light')
  })

  it('marks current theme button as active', () => {
    const { getByTestId } = render(<ThemeToggle />)

    const light = getByTestId('theme-light')
    const dark = getByTestId('theme-dark')
    const system = getByTestId('theme-system')

    expect(light.props.accessibilityState.selected).toBe(true)
    expect(dark.props.accessibilityState?.selected).not.toBe(true)
    expect(system.props.accessibilityState?.selected).not.toBe(true)
  })

  it('changes active button when theme changes', () => {
    mockedUseTheme.mockReturnValue({
      theme: 'dark',
      updateTheme,
      colors: {
        primaryForeground: '#fff',
        surfaceForeground: '#000',
      },
    })

    const { getByTestId } = render(<ThemeToggle />)

    expect(getByTestId('theme-dark').props.accessibilityState.selected).toBe(
      true,
    )
    expect(
      getByTestId('theme-light').props.accessibilityState?.selected,
    ).not.toBe(true)
  })

  it('updates active button when provider theme changes', () => {
    const { rerender, getByTestId } = render(<ThemeToggle />)

    mockedUseTheme.mockReturnValue({
      theme: 'dark',
      updateTheme,
      colors: {
        primaryForeground: '#fff',
        surfaceForeground: '#000',
      },
    })

    rerender(<ThemeToggle />)

    expect(getByTestId('theme-dark').props.accessibilityState.selected).toBe(
      true,
    )
  })
})
