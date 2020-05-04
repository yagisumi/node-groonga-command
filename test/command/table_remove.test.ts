import { TableRemove, isTableRemove } from '@/command/table_remove'
import { createCommand } from '@/command/groonga_command'

describe('table_remove', () => {
  const name = 'Users'
  const dependent = 'yes'

  test('TableRemove.command_name', () => {
    const command = new TableRemove({})
    expect(command.command_name).toBe('table_remove')
  })

  test('new TableRemove({}, ordered_arguments)', () => {
    const command = new TableRemove({}, [
      name, //
      dependent,
    ])

    expect(command.arguments).toEqual({
      name,
      dependent,
    })
  })

  test('TableRemove.name', () => {
    const command = new TableRemove({ name })
    expect(command.name).toBe(name)
  })

  test.each([
    [true, {}],
    [false, { dependent: 'no' }],
  ])('TableRemove.is_dependent()', (expected, args) => {
    const command = new TableRemove(args)
    expect(command.is_dependent()).toBe(expected)
  })

  test('isTableRemove', () => {
    const command = createCommand('table_remove', { name })
    expect(isTableRemove(command)).toBe(true)
    if (isTableRemove(command)) {
      expect(command).toBeInstanceOf(TableRemove)
      expect(command.name).toBe(name)
    }
  })
})
