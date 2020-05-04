import { LogicalTableRemove, isLogicalTableRemove } from '@/command/logical_table_remove'
import { createCommand } from '@/command/groonga_command'

describe('logical_table_remove', () => {
  const logical_table = 'Logs'
  const shard_key = 'timestamp'
  const min = '2015-02-12 00:00:00'
  const min_border = 'include'
  const max = '2015-02-13 00:00:00'
  const max_border = 'exclude'

  test('LogicalTableRemove.command_name', () => {
    const command = new LogicalTableRemove({})
    expect(command.command_name).toBe('logical_table_remove')
  })

  test('new LogicalTableRemove({}, ordered_arguments)', () => {
    const command = new LogicalTableRemove({}, [
      logical_table, //
      shard_key,
      min,
      min_border,
      max,
      max_border,
    ])

    expect(command.arguments).toEqual({
      logical_table,
      shard_key,
      min,
      min_border,
      max,
      max_border,
    })
  })

  test('LogicalTableRemove.logical_table', () => {
    const command = new LogicalTableRemove({ logical_table })
    expect(command.logical_table).toBe(logical_table)
  })

  test('LogicalTableRemove.shard_key', () => {
    const command = new LogicalTableRemove({ shard_key })
    expect(command.shard_key).toBe(shard_key)
  })

  test('LogicalTableRemove.min', () => {
    const command = new LogicalTableRemove({ min })
    expect(command.min).toBe(min)
  })

  test('LogicalTableRemove.min_border', () => {
    const command = new LogicalTableRemove({ min_border })
    expect(command.min_border).toBe(min_border)
  })

  test('LogicalTableRemove.max', () => {
    const command = new LogicalTableRemove({ max })
    expect(command.max).toBe(max)
  })

  test('LogicalTableRemove.max_border', () => {
    const command = new LogicalTableRemove({ max_border })
    expect(command.max_border).toBe(max_border)
  })

  test('isLogicalTableRemove', () => {
    const command = createCommand('logical_table_remove', { max_border })
    expect(isLogicalTableRemove(command)).toBe(true)
    if (isLogicalTableRemove(command)) {
      expect(command).toBeInstanceOf(LogicalTableRemove)
      expect(command.max_border).toBe(max_border)
    }
  })
})
