import { IOFlush, isIOFlush } from '@/command/io_flush'
import { createCommand } from '@/command/groonga_command'

describe('io_flush', () => {
  const target_name = 'Users'
  const recursive = 'no'

  test('IOFlush.command_name', () => {
    const command = new IOFlush({})
    expect(command.command_name).toBe('io_flush')
  })

  test('new IOFlush({}, ordered_arguments)', () => {
    const command = new IOFlush({}, [
      target_name, //
      recursive,
    ])

    expect(command.arguments).toEqual({
      target_name,
      recursive,
    })
  })

  test('IOFlush.target_name', () => {
    const command = new IOFlush({ target_name })
    expect(command.target_name).toBe(target_name)
  })

  test.each([
    [true, {}],
    [false, { recursive: 'no' }],
  ])('IOFlush.is_recursive()', (expected, args) => {
    const command = new IOFlush(args)
    expect(command.is_recursive()).toBe(expected)
  })

  test('isIOFlush', () => {
    const command = createCommand('io_flush', { target_name })
    expect(isIOFlush(command)).toBe(true)
    if (isIOFlush(command)) {
      expect(command).toBeInstanceOf(IOFlush)
      expect(command.target_name).toBe(target_name)
    }
  })
})
