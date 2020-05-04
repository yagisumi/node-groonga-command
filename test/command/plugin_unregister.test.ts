import { PluginUnregister, isPluginUnregister } from '@/command/plugin_unregister'
import { createCommand } from '@/command/groonga_command'

describe('plugin_unregister', () => {
  const name = 'query_expanders/tsv'

  test('PluginUnregister.command_name', () => {
    const command = new PluginUnregister({})
    expect(command.command_name).toBe('plugin_unregister')
  })

  test('new PluginUnregister({}, ordered_arguments)', () => {
    const command = new PluginUnregister({}, [
      name, //
    ])

    expect(command.arguments).toEqual({
      name,
    })
  })

  test('PluginUnregister.name', () => {
    const command = new PluginUnregister({ name })
    expect(command.name).toBe(name)
  })

  test.each([
    [true, { name: 'query_expanders/tsv' }, { name: 'query_expanders/tsv' }],
    [false, { name: 'query_expanders/tsv' }, { name: 'functions/vector' }],
  ])('PluginUnregister.equals(cmd)', (expected, args1, args2) => {
    const command1 = new PluginUnregister(args1)
    const command2 = new PluginUnregister(args2)
    expect(command1.equals(command2)).toBe(expected)
  })

  test('isPluginUnregister', () => {
    const command = createCommand('plugin_unregister', { name })
    expect(isPluginUnregister(command)).toBe(true)
    if (isPluginUnregister(command)) {
      expect(command).toBeInstanceOf(PluginUnregister)
      expect(command.name).toBe(name)
    }
  })
})
