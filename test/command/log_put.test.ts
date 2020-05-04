import { LogPut, isLogPut } from '@/command/log_put'
import { createCommand } from '@/command/groonga_command'

describe('log_put', () => {
  const level = 'debug'
  const message = 'Hello!'

  test('LogPut.command_name', () => {
    const command = new LogPut({})
    expect(command.command_name).toBe('log_put')
  })

  test('new LogPut({}, ordered_arguments)', () => {
    const command = new LogPut({}, [
      level, //
      message,
    ])

    expect(command.arguments).toEqual({
      level,
      message,
    })
  })

  test('LogPut.level', () => {
    const command = new LogPut({ level })
    expect(command.level).toBe(level)
  })

  test('LogPut.message', () => {
    const command = new LogPut({ message })
    expect(command.message).toBe(message)
  })

  test('isLogPut', () => {
    const command = createCommand('log_put', { message })
    expect(isLogPut(command)).toBe(true)
    if (isLogPut(command)) {
      expect(command).toBeInstanceOf(LogPut)
      expect(command.message).toBe(message)
    }
  })
})
