import { QueryLogFlagsSet, isQueryLogFlagsSet } from '@/command/query_log_flags_set'
import { createCommand } from '@/command/groonga_command'

describe('query_log_flags_set', () => {
  const flags = 'COMMAND|RESULT_CODE'

  test('QueryLogFlagsSet.command_name', () => {
    const command = new QueryLogFlagsSet({})
    expect(command.command_name).toBe('query_log_flags_set')
  })

  test('new QueryLogFlagsSet({}, ordered_arguments)', () => {
    const command = new QueryLogFlagsSet({}, [
      flags, //
    ])

    expect(command.arguments).toEqual({
      flags,
    })
  })

  test('QueryLogFlagsRemove.flags', () => {
    const command = new QueryLogFlagsSet({ flags })
    expect(command.flags).toEqual(['COMMAND', 'RESULT_CODE'])
  })

  test('isQueryLogFlagsSet', () => {
    const command = createCommand('query_log_flags_set', { flags })
    expect(isQueryLogFlagsSet(command)).toBe(true)
    if (isQueryLogFlagsSet(command)) {
      expect(command).toBeInstanceOf(QueryLogFlagsSet)
      expect(command.flags).toEqual(['COMMAND', 'RESULT_CODE'])
    }
  })
})
