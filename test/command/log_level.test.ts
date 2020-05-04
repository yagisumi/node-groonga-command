import { LogLevel, isLogLevel } from '@/command/log_level'
import { createCommand } from '@/command/groonga_command'

describe('log_level', () => {
  const level = 'debug'

  test('LogLevel.command_name', () => {
    const command = new LogLevel({})
    expect(command.command_name).toBe('log_level')
  })

  test('new LogLevel({}, ordered_arguments)', () => {
    const command = new LogLevel({}, [
      level, //
    ])

    expect(command.arguments).toEqual({
      level,
    })
  })

  test('LogLevel.level', () => {
    const command = new LogLevel({ level })
    expect(command.level).toBe(level)
  })

  test('isLogLevel', () => {
    const command = createCommand('log_level', { level })
    expect(isLogLevel(command)).toBe(true)
    if (isLogLevel(command)) {
      expect(command).toBeInstanceOf(LogLevel)
      expect(command.level).toBe(level)
    }
  })
})
