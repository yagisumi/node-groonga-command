import { QueryLogFlagsAdd, isQueryLogFlagsAdd } from '@/command/query_log_flags_add'
import { createCommand } from '@/command/groonga_command'

describe('query_log_flags_add', () => {
  const flags = 'COMMAND|RESULT_CODE'

  test('QueryLogFlagsAdd.command_name', () => {
    const command = new QueryLogFlagsAdd({})
    expect(command.command_name).toBe('query_log_flags_add')
  })

  test('new QueryLogFlagsAdd({}, ordered_arguments)', () => {
    const command = new QueryLogFlagsAdd({}, [
      flags, //
    ])

    expect(command.arguments).toEqual({
      flags,
    })
  })

  test('QueryLogFlagsAdd.flags', () => {
    const command = new QueryLogFlagsAdd({ flags })
    expect(command.flags).toEqual(['COMMAND', 'RESULT_CODE'])
  })

  test('isQueryLogFlagsAdd', () => {
    const command = createCommand('query_log_flags_add', { flags })
    expect(isQueryLogFlagsAdd(command)).toBe(true)
    if (isQueryLogFlagsAdd(command)) {
      expect(command).toBeInstanceOf(QueryLogFlagsAdd)
      expect(command.flags).toEqual(['COMMAND', 'RESULT_CODE'])
    }
  })
})
