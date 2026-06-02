import Page from '@/app/+not-found'
import { render } from '@testing-library/react-native'

describe('Not found page', () => {
  it('renders a link to the home page', () => {
    const { getByRole } = render(<Page />)

    const link = getByRole('link', { name: 'Back to home' })

    expect(link).toBeTruthy()
    expect(link).toHaveProp('href', '/')
  })
})
