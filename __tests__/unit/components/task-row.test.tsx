import TaskRow from '@/components/task-row'
import { useThemeContext } from '@/providers/theme-provider'
import type { Task } from '@/types/task'
import { fireEvent, render } from '@testing-library/react-native'
import { Platform } from 'react-native'

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

const renderTaskRow = () => {
  return render(
    <TaskRow
      task={mockedTask}
      toggleComplete={toggleCompleteMock}
      onEdit={onEditMock}
    />,
  )
}

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
    const { getByText, getByRole } = renderTaskRow()

    expect(getByText(mockedTask.title)).toBeTruthy()
    expect(getByRole('button')).toBeTruthy()
  })

  it('calls the `complete` function on pressing the action button', () => {
    const { getByRole } = renderTaskRow()

    const button = getByRole('button')
    fireEvent.press(button)

    expect(toggleCompleteMock).toHaveBeenCalled()
  })

  it('calls onEdit on long press', () => {
    const { getByTestId } = renderTaskRow()
    const taskRow = getByTestId('task-row')

    fireEvent(taskRow, 'longPress')

    expect(onEditMock).toHaveBeenCalled()
  })

  it('renders an edit icon button only on web', () => {
    ;(Platform as any).OS = 'web'

    const { getByTestId } = renderTaskRow()

    const editBtn = getByTestId('edit-button')
    expect(editBtn).toBeTruthy()
  })
})
