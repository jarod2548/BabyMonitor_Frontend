import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from './Login'


const mockNavigate = vi.fn()
const mockSetUser = vi.fn()

const mockLogin = vi.hoisted(() => vi.fn())
const mockValidate = vi.hoisted(() => vi.fn())

vi.mock('../../Services/AccountService', () => ({
  accountService: {
    Login: mockLogin,
    validateLogin: mockValidate,
  },
}))


vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('../../authorization/useAuth', () => ({
  useAuth: () => ({
    setUser: mockSetUser,
  }),
}))



describe('Login UI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })


  test('renders login form', () => {
    render(<Login />)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })


  test('updates input fields', () => {
    render(<Login />)

    const nameInput = screen.getByPlaceholderText('Name')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(nameInput, { target: { value: 'john' } })
    fireEvent.change(passwordInput, { target: { value: '1234' } })

    expect(nameInput).toHaveValue('john')
    expect(passwordInput).toHaveValue('1234')
  })


  test('shows validation message', () => {
    mockValidate.mockReturnValue('Please fill in both fields!')

    render(<Login />)

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(screen.getByText(/please fill in both fields/i)).toBeInTheDocument()
  })


  test('logs in and navigates', async () => {
    mockValidate.mockReturnValue(null)
    mockLogin.mockResolvedValue({
      id: 1,
      username: 'john',
    })

    render(<Login />)

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'john' },
    })

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '1234' },
    })

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled()
      expect(mockSetUser).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('/home')
    })
  })
})