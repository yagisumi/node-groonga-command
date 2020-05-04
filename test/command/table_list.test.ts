import { TableList, isTableList } from '@/command/table_list'
import { createCommand } from '@/command/groonga_command'

describe('table_list', () => {
  const prefix = 'Logs_2015'

  test('TableList.command_name', () => {
    const command = new TableList({})
    expect(command.command_name).toBe('table_list')
  })

  test('new TableList({}, ordered_arguments)', () => {
    const command = new TableList({}, [
      prefix, //
    ])

    expect(command.arguments).toEqual({
      prefix,
    })
  })

  test('TableList.prefix', () => {
    const command = new TableList({ prefix })
    expect(command.prefix).toBe(prefix)
  })

  test('isTableList', () => {
    const command = createCommand('table_list', { prefix })
    expect(isTableList(command)).toBe(true)
    if (isTableList(command)) {
      expect(command).toBeInstanceOf(TableList)
      expect(command.prefix).toBe(prefix)
    }
  })
})
