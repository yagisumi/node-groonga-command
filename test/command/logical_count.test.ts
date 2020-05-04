import { LogicalCount, isLogicalCount } from '@/command/logical_count'
import { createCommand } from '@/command/groonga_command'

describe('logical_count', () => {
  const logical_table = 'Logs'
  const shard_key = 'timestamp'
  const min = '2015-02-12 00:00:00'
  const min_border = 'include'
  const max = '2015-02-13 00:00:00'
  const max_border = 'exclude'
  const filter = 'message == "Shutdown"'

  test('LogicalCount.command_name', () => {
    const command = new LogicalCount({})
    expect(command.command_name).toBe('logical_count')
  })

  test('new LogicalCount({}, ordered_arguments)', () => {
    const command = new LogicalCount({}, [
      logical_table, //
      shard_key,
      min,
      min_border,
      max,
      max_border,
      filter,
    ])

    expect(command.arguments).toEqual({
      logical_table,
      shard_key,
      min,
      min_border,
      max,
      max_border,
      filter,
    })
  })

  test('LogicalCount.logical_table', () => {
    const command = new LogicalCount({ logical_table })
    expect(command.logical_table).toBe(logical_table)
  })

  test('LogicalCount.shard_key', () => {
    const command = new LogicalCount({ shard_key })
    expect(command.shard_key).toBe(shard_key)
  })

  test('LogicalCount.min', () => {
    const command = new LogicalCount({ min })
    expect(command.min).toBe(min)
  })

  test('LogicalCount.min_border', () => {
    const command = new LogicalCount({ min_border })
    expect(command.min_border).toBe(min_border)
  })

  test('LogicalCount.max', () => {
    const command = new LogicalCount({ max })
    expect(command.max).toBe(max)
  })

  test('LogicalCount.max_border', () => {
    const command = new LogicalCount({ max_border })
    expect(command.max_border).toBe(max_border)
  })

  test('LogicalCount.filter', () => {
    const command = new LogicalCount({ filter })
    expect(command.filter).toBe(filter)
  })

  test('isLogicalCount', () => {
    const command = createCommand('logical_count', { filter })
    expect(isLogicalCount(command)).toBe(true)
    if (isLogicalCount(command)) {
      expect(command).toBeInstanceOf(LogicalCount)
      expect(command.filter).toBe(filter)
    }
  })
})
