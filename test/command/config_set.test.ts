import { ConfigSet, isConfigSet } from '@/command/config_set'
import { createCommand } from '@/command/groonga_command'

describe('config_set', () => {
  const key = 'alias.table'
  const value = 'Aliases'

  test('ConfigSet.command_name', () => {
    const command = new ConfigSet({})
    expect(command.command_name).toBe('config_set')
  })

  test('new ConfigSet({}, ordered_arguments)', () => {
    const command = new ConfigSet({}, [
      key, //
      value,
    ])

    expect(command.arguments).toEqual({
      key,
      value,
    })
  })

  test('ConfigSet.key', () => {
    const command = new ConfigSet({ key })
    expect(command.key).toBe(key)
  })

  test('ConfigSet.value', () => {
    const command = new ConfigSet({ value })
    expect(command.value).toBe(value)
  })

  test('isConfigSet', () => {
    const command = createCommand('config_set', { value })
    expect(isConfigSet(command)).toBe(true)
    if (isConfigSet(command)) {
      expect(command).toBeInstanceOf(ConfigSet)
      expect(command.value).toBe(value)
    }
  })
})
