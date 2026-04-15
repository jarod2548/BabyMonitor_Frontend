import { describe, test, expect} from 'vitest'
import { accountService } from '../../Services/AccountService'



describe('validateLogin', () => {
  test('fails when fields are empty', () => {
    expect(accountService.validateLogin({ username: '', password: '' }))
      .toBe('Please fill in both fields!')
  })

  test('passes when fields are filled', () => {
    expect(accountService.validateLogin({ username: 'a', password: 'b' }))
      .toBe(null)
  })
})