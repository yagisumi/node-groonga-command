import { QueryLogFlagsGet, isQueryLogFlagsGet } from '@/command/query_log_flags_get'
import { createCommand } from '@/command/groonga_command'

describe('query_log_flags_get', () => {
  test('QueryLogFlagsGet.command_name', () => {
    const command = new QueryLogFlagsGet({})
    expect(command.command_name).toBe('query_log_flags_get')
  })

  test('new QueryLogFlagsGet({}, ordered_arguments)', () => {
    const command = new QueryLogFlagsGet({}, [])

    expect(command.arguments).toEqual({})
  })

  test('isQueryLogFlagsGet', () => {
    const command = createCommand('query_log_flags_get', {})
    expect(isQueryLogFlagsGet(command)).toBe(true)
    if (isQueryLogFlagsGet(command)) {
      expect(command).toBeInstanceOf(QueryLogFlagsGet)
    }
  })
})
