import { Shutdown, isShutdown } from '@/command/shutdown'
import { createCommand } from '@/command/groonga_command'

describe('shutdown', () => {
  const mode = 'immediate'

  test('Shutdown.command_name', () => {
    const command = new Shutdown({})
    expect(command.command_name).toBe('shutdown')
  })

  test('new Shutdown({}, ordered_arguments)', () => {
    const command = new Shutdown({}, [
      mode, //
    ])

    expect(command.arguments).toEqual({
      mode,
    })
  })

  test('Shutdown.mode', () => {
    const command = new Shutdown({ mode })
    expect(command.mode).toBe(mode)
  })

  test('isShutdown', () => {
    const command = createCommand('shutdown', { mode })
    expect(isShutdown(command)).toBe(true)
    if (isShutdown(command)) {
      expect(command).toBeInstanceOf(Shutdown)
      expect(command.mode).toBe(mode)
    }
  })
})
