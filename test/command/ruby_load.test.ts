import { RubyLoad, isRubyLoad } from '@/command/ruby_load'
import { createCommand } from '@/command/groonga_command'

describe('ruby_load', () => {
  const path = 'my-library.rb'

  test('RubyLoad.command_name', () => {
    const command = new RubyLoad({})
    expect(command.command_name).toBe('ruby_load')
  })

  test('new RubyLoad({}, ordered_arguments)', () => {
    const command = new RubyLoad({}, [
      path, //
    ])

    expect(command.arguments).toEqual({
      path,
    })
  })

  test('RubyLoad.path', () => {
    const command = new RubyLoad({ path })
    expect(command.path).toBe(path)
  })

  test('isRubyLoad', () => {
    const command = createCommand('ruby_load', { path })
    expect(isRubyLoad(command)).toBe(true)
    if (isRubyLoad(command)) {
      expect(command).toBeInstanceOf(RubyLoad)
      expect(command.path).toBe(path)
    }
  })
})
