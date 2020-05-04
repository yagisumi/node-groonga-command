import { QueryLogFlagsRemove, isQueryLogFlagsRemove } from '@/command/query_log_flags_remove'
import { createCommand } from '@/command/groonga_command'

describe('query_log_flags_remove', () => {
  const flags = 'COMMAND|RESULT_CODE'

  test('QueryLogFlagsRemove.command_name', () => {
    const command = new QueryLogFlagsRemove({})
    expect(command.command_name).toBe('query_log_flags_remove')
  })

  test('new QueryLogFlagsRemove({}, ordered_arguments)', () => {
    const command = new QueryLogFlagsRemove({}, [
      flags, //
    ])

    expect(command.arguments).toEqual({
      flags,
    })
  })

  test('QueryLogFlagsRemove.flags', () => {
    const command = new QueryLogFlagsRemove({ flags })
    expect(command.flags).toEqual(['COMMAND', 'RESULT_CODE'])
  })

  test('isQueryLogFlagsRemove', () => {
    const command = createCommand('query_log_flags_remove', { flags })
    expect(isQueryLogFlagsRemove(command)).toBe(true)
    if (isQueryLogFlagsRemove(command)) {
      expect(command).toBeInstanceOf(QueryLogFlagsRemove)
      expect(command.flags).toEqual(['COMMAND', 'RESULT_CODE'])
    }
  })
})
