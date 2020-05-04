import { ConfigDelete, isConfigDelete } from '@/command/config_delete'
import { createCommand } from '@/command/groonga_command'

describe('config_delete', () => {
  const key = 'alias.table'

  test('ConfigDelete.command_name', () => {
    const command = new ConfigDelete({})
    expect(command.command_name).toBe('config_delete')
  })

  test('new ConfigDelete({}, ordered_arguments)', () => {
    const command = new ConfigDelete({}, [
      key, //
    ])

    expect(command.arguments).toEqual({
      key,
    })
  })

  test('ConfigDelete.key', () => {
    const command = new ConfigDelete({ key })
    expect(command.key).toBe(key)
  })

  test('isConfigDelete', () => {
    const command = createCommand('config_delete', { key })
    expect(isConfigDelete(command)).toBe(true)
    if (isConfigDelete(command)) {
      expect(command).toBeInstanceOf(ConfigDelete)
      expect(command.key).toBe(key)
    }
  })
})
