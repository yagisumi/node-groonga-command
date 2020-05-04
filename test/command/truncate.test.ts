import { Truncate, isTruncate } from '@/command/truncate'
import { createCommand } from '@/command/groonga_command'

describe('truncate', () => {
  const target_name = 'Users'

  test('Truncate.command_name', () => {
    const command = new Truncate({})
    expect(command.command_name).toBe('truncate')
  })

  test('new Truncate({}, ordered_arguments)', () => {
    const command = new Truncate({}, [
      target_name, //
    ])

    expect(command.arguments).toEqual({
      target_name,
    })
  })

  test.each([
    [undefined, {}],
    [target_name, { target_name }],
    [target_name, { table: target_name }],
  ])('Truncate.target_name', (expected, args) => {
    const command = new Truncate(args)
    expect(command.target_name).toBe(expected)
  })

  test('isTruncate', () => {
    const command = createCommand('truncate', { target_name })
    expect(isTruncate(command)).toBe(true)
    if (isTruncate(command)) {
      expect(command).toBeInstanceOf(Truncate)
      expect(command.target_name).toBe(target_name)
    }
  })
})
