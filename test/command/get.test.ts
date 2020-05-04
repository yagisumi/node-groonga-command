import { Get, isGet } from '@/command/get'
import { createCommand } from '@/command/groonga_command'

describe('get', () => {
  const table = 'Users'
  const key = 'Alice'
  const output_columns = 'name, address'

  test('Get.command_name', () => {
    const command = new Get({})
    expect(command.command_name).toBe('get')
  })

  test('new Get({}, ordered_arguments)', () => {
    const command = new Get({}, [
      table, //
      key,
      output_columns,
    ])

    expect(command.arguments).toEqual({
      table,
      key,
      output_columns,
    })
  })

  test('isGet', () => {
    const command = createCommand('get', {})
    expect(isGet(command)).toBe(true)
    if (isGet(command)) {
      expect(command).toBeInstanceOf(Get)
    }
  })
})
