import { PluginRegister, isPluginRegister } from '@/command/plugin_register'
import { createCommand } from '@/command/groonga_command'

describe('plugin_register', () => {
  const name = 'query_expanders/tsv'

  test('PluginRegister.command_name', () => {
    const command = new PluginRegister({})
    expect(command.command_name).toBe('plugin_register')
  })

  test('new PluginRegister({}, ordered_arguments)', () => {
    const command = new PluginRegister({}, [
      name, //
    ])

    expect(command.arguments).toEqual({
      name,
    })
  })

  test('PluginRegister.name', () => {
    const command = new PluginRegister({ name })
    expect(command.name).toBe(name)
  })

  test('isPluginRegister', () => {
    const command = createCommand('plugin_register', { name })
    expect(isPluginRegister(command)).toBe(true)
    if (isPluginRegister(command)) {
      expect(command).toBeInstanceOf(PluginRegister)
      expect(command.name).toBe(name)
    }
  })
})
