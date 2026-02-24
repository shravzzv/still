import TaskRow from '@/components/task-row'
import { useThemeContext } from '@/providers/theme-provider'
import type { Task } from '@/types/task'
import { fireEvent, render } from '@testing-library/react-native'

jest.mock('@/providers/theme-provider')

const mockedUseTheme = useThemeContext as jest.Mock

const mockedTask: Task = {
  id: '1',
  title: 'Breathe',
  completed: false,
  createdAt: '',
}

const toggleCompleteMock = jest.fn()
const onEditMock = jest.fn()

describe('TaskRow', () => {
  beforeEach(() => {
    mockedUseTheme.mockReturnValue({
      colors: {},
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows a title and an action button', () => {
    const { getByText, getByRole } = render(
      <TaskRow
        task={mockedTask}
        toggleComplete={toggleCompleteMock}
        onEdit={onEditMock}
      />,
    )

    expect(getByText(mockedTask.title)).toBeTruthy()
    expect(getByRole('button')).toBeTruthy()
  })

  it('calls the `complete` function on pressing the action button', () => {
    const { getByRole } = render(
      <TaskRow
        task={mockedTask}
        toggleComplete={toggleCompleteMock}
        onEdit={onEditMock}
      />,
    )

    const button = getByRole('button')
    fireEvent.press(button)

    expect(toggleCompleteMock).toHaveBeenCalled()
  })
})
