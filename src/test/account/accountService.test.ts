// import { describe, test, expect, vi} from 'vitest'
// import { accountService } from '../../Services/AccountService'
// import type { LoginDTO } from '../../contracts/Account/LoginDTO';
// import axios from 'axios';
// import type { RegisterDTO } from '../../contracts/Account/RegisterDTO';
//
// vi.mock("axios");
// const mockedAxios = vi.mocked(axios)
//
// describe('validateLogin', () => {
//   test('fails when fields are empty', () => {
//     expect(accountService.validateLogin({ email: '', password: '' }))
//       .toBe('Please fill in both fields!')
//   })
//
//   test('passes when fields are filled', () => {
//     expect(accountService.validateLogin({ email: 'a', password: 'b' }))
//       .toBe(null)
//   })
// })
//
// describe('login', () => {
//   const mockLogin : LoginDTO = {
//       email : 'naam',
//       password : '1234'
//     }
//
//   test('login success' ,  async () => {
//
//     const fakeResponse = {
//       status: 200,
//       data: {
//         id: 1,
//         email: 'john',
//         token: 'abc'
//       }
//     }
//
//     mockedAxios.post.mockResolvedValueOnce(fakeResponse)
//
//     const result = await accountService.Login(mockLogin)
//
//     expect(result).toEqual(fakeResponse.data)
//
//   })
//
//   test('login faalt', async () => {
//
//     mockedAxios.post.mockRejectedValueOnce(new Error('Server error'));
//
//     const result = await accountService.Login(mockLogin);
//
//     expect(result).toBe(null);
//   })
// })
//
// describe('registreer', () => {
//   const mockRegistratie : RegisterDTO = {
//     username : "naam",
//     password : '1234',
//     email : 'test@gmail.com'
//   }
//   test("registratie succes", async () => {
//
//     mockedAxios.post.mockResolvedValueOnce(undefined)
//
//     const result = await accountService.Registratie(mockRegistratie);
//
//     expect(result).toBe(true);
//   })
//
//   test('registratie fail', async () => {
//
//     mockedAxios.post.mockRejectedValueOnce(new Error('fail'))
//
//     const result = await accountService.Registratie(mockRegistratie)
//
//     expect(result).toBe(false)
//   })
//})