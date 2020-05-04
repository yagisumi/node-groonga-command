import { LogicalShardList, isLogicalShardList } from '@/command/logical_shard_list'
import { createCommand } from '@/command/groonga_command'

describe('logical_shard_list', () => {
  const logical_table = 'Logs'

  test('LogicalShardList.command_name', () => {
    const command = new LogicalShardList({})
    expect(command.command_name).toBe('logical_shard_list')
  })

  test('new LogicalShardList({}, ordered_arguments)', () => {
    const command = new LogicalShardList({}, [
      logical_table, //
    ])

    expect(command.arguments).toEqual({
      logical_table,
    })
  })

  test('LogicalShardList.logical_table', () => {
    const command = new LogicalShardList({ logical_table })
    expect(command.logical_table).toBe(logical_table)
  })

  test('isLogicalShardList', () => {
    const command = createCommand('logical_shard_list', { logical_table })
    expect(isLogicalShardList(command)).toBe(true)
    if (isLogicalShardList(command)) {
      expect(command).toBeInstanceOf(LogicalShardList)
      expect(command.logical_table).toBe(logical_table)
    }
  })
})
