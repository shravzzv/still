import { useTheme } from '@/hooks/use-theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, renderHook, waitFor } from '@testing-library/react-native'
import { useColorScheme } from 'nativewind'

jest.mock('nativewind')
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}))

const mockSetColorScheme = jest.fn()

describe('useTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useColorScheme as jest.Mock).mockReturnValue({
      colorScheme: 'light',
      setColorScheme: mockSetColorScheme,
    })
  })

  it('returns default system theme and light colors initially', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('system')
    expect(result.current.colors).toBeDefined()
  })

  it('hydrates theme from AsyncStorage on mount', async () => {
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue('dark')

    renderHook(() => useTheme())

    await waitFor(() => {
      expect(mockSetColorScheme).toHaveBeenCalledWith('dark')
    })
  })

  it('updateTheme persists and updates nativewind scheme', async () => {
    const { result } = renderHook(() => useTheme())

    await act(async () => {
      result.current.updateTheme('dark')
    })

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('still:theme', 'dark')
    expect(mockSetColorScheme).toHaveBeenCalledWith('dark')
  })

  it('ignores invalid stored theme values', async () => {
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue('banana')

    renderHook(() => useTheme())

    await waitFor(() => {
      expect(mockSetColorScheme).toHaveBeenCalledWith('system')
    })
  })
})
