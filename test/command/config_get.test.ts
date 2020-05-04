import { ConfigGet, isConfigGet } from '@/command/config_get'
import { createCommand } from '@/command/groonga_command'

describe('config_get', () => {
  const key = 'alias.table'

  test('ConfigGet.command_name', () => {
    const command = new ConfigGet({})
    expect(command.command_name).toBe('config_get')
  })

  test('new ConfigGet({}, ordered_arguments)', () => {
    const command = new ConfigGet({}, [
      key, //
    ])

    expect(command.arguments).toEqual({
      key,
    })
  })

  test('ConfigGet.key', () => {
    const command = new ConfigGet({ key })
    expect(command.key).toBe(key)
  })

  test('isConfigGet', () => {
    const command = createCommand('config_get', { key })
    expect(isConfigGet(command)).toBe(true)
    if (isConfigGet(command)) {
      expect(command).toBeInstanceOf(ConfigGet)
      expect(command.key).toBe(key)
    }
  })
})
