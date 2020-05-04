import { RubyEval, isRubyEval } from '@/command/ruby_eval'
import { createCommand } from '@/command/groonga_command'

describe('ruby_eval', () => {
  const script = '1 + 1'

  test('RubyEval.command_name', () => {
    const command = new RubyEval({})
    expect(command.command_name).toBe('ruby_eval')
  })

  test('new RubyEval({}, ordered_arguments)', () => {
    const command = new RubyEval({}, [
      script, //
    ])

    expect(command.arguments).toEqual({
      script,
    })
  })

  test('RubyEval.name', () => {
    const command = new RubyEval({ script })
    expect(command.script).toBe(script)
  })

  test('isRubyEval', () => {
    const command = createCommand('ruby_eval', { script })
    expect(isRubyEval(command)).toBe(true)
    if (isRubyEval(command)) {
      expect(command).toBeInstanceOf(RubyEval)
      expect(command.script).toBe(script)
    }
  })
})
