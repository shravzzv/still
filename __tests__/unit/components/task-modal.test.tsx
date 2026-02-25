import TaskModal from '@/components/task-modal'
import { useThemeContext } from '@/providers/theme-provider'
import { fireEvent, render } from '@testing-library/react-native'

jest.mock('@/providers/theme-provider')
// mocking the entire provider, makes useThemeContext a jest.fn()
/**
 * You need to tell Jest that the version of useThemeContext imported
 * by TaskModal is the same jest.fn() you are controlling in your test.
 */
const useThemeContextMock = useThemeContext as jest.Mock
useThemeContextMock.mockReturnValue({ colors: {} })

const closeModalMock = jest.fn()
const onSubmitMock = jest.fn()

const renderTaskModal = (
  taskTitle: string | null = null,
  showModal: boolean = true,
) => {
  return render(
    <TaskModal
      closeModal={closeModalMock}
      onSubmit={onSubmitMock}
      showModal={showModal}
      taskTitle={taskTitle}
    />,
  )
}

describe('TaskModal', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders a text input, submit & cancel buttons', () => {
    const { getByPlaceholderText, getByRole } = renderTaskModal()

    const input = getByPlaceholderText(`What's on your mind?`)
    const submitBtn = getByRole('button', { name: 'Submit' })
    const cancelBtn = getByRole('button', { name: 'Cancel' })

    expect(input).toBeTruthy()
    expect(submitBtn).toBeTruthy()
    expect(cancelBtn).toBeTruthy()
  })

  it('calls onSubmit when submit button is clicked', () => {
    const { getByPlaceholderText, getByRole } = renderTaskModal()

    const input = getByPlaceholderText(`What's on your mind?`)
    const submitBtn = getByRole('button', { name: 'Submit' })

    fireEvent.changeText(input, 'arbitrary task title')
    fireEvent.press(submitBtn)

    expect(onSubmitMock).toHaveBeenCalled()
  })

  it('calls closeModal when cancel button is clicked', () => {
    const { getByRole } = renderTaskModal()

    const cancelBtn = getByRole('button', { name: 'Cancel' })
    fireEvent.press(cancelBtn)
    expect(closeModalMock).toHaveBeenCalled()
  })

  it(`doesn't call onSubmit on empty text`, () => {
    const { getByRole, getByPlaceholderText } = renderTaskModal()

    const submitBtn = getByRole('button', { name: 'Submit' })
    expect(submitBtn).toBeDisabled()

    fireEvent.press(submitBtn)
    expect(onSubmitMock).not.toHaveBeenCalled()

    const input = getByPlaceholderText(`What's on your mind?`)
    fireEvent.changeText(input, '  ')
    fireEvent.press(submitBtn)
    expect(onSubmitMock).not.toHaveBeenCalled()
  })

  it('shows taskTitle as the text input content when passed', () => {
    const taskTitle = 'arbitrary'
    const { getByPlaceholderText } = renderTaskModal(taskTitle)

    const input = getByPlaceholderText(`What's on your mind?`)

    expect(input).toHaveDisplayValue(taskTitle)
  })

  it('calls onSubmit with trimmed text', () => {
    const { getByPlaceholderText, getByRole } = renderTaskModal()
    const input = getByPlaceholderText(`What's on your mind?`)
    const submitBtn = getByRole('button', { name: 'Submit' })

    fireEvent.changeText(input, '  Trim Me  ')
    fireEvent.press(submitBtn)

    expect(onSubmitMock).toHaveBeenCalledWith('Trim Me')
  })
})
