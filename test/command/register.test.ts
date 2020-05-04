import { Register, isRegister } from '@/command/register'
import { createCommand } from '@/command/groonga_command'

describe('register', () => {
  const path = 'tokenizers/mecab'

  test('Register.command_name', () => {
    const command = new Register({})
    expect(command.command_name).toBe('register')
  })

  test('new Register({}, ordered_arguments)', () => {
    const command = new Register({}, [
      path, //
    ])

    expect(command.arguments).toEqual({
      path,
    })
  })

  test('Register.path', () => {
    const command = new Register({ path })
    expect(command.path).toBe(path)
  })

  test('isRegister', () => {
    const command = createCommand('register', { path })
    expect(isRegister(command)).toBe(true)
    if (isRegister(command)) {
      expect(command).toBeInstanceOf(Register)
      expect(command.path).toBe(path)
    }
  })
})
