import { ColumnList, isColumnList } from '@/command/column_list'
import { createCommand } from '@/command/groonga_command'

describe('column_list', () => {
  const table = 'Users'

  test('ColumnList.command_name', () => {
    const command = new ColumnList({})
    expect(command.command_name).toBe('column_list')
  })

  test('new ColumnList({}, ordered_arguments)', () => {
    const command = new ColumnList({}, [
      table, //
    ])

    expect(command.arguments).toEqual({
      table,
    })
  })

  test('ColumnList.table', () => {
    const command = new ColumnList({ table })
    expect(command.table).toBe(table)
  })

  test('isColumnList', () => {
    const command = createCommand('column_list', { table })
    expect(isColumnList(command)).toBe(true)
    if (isColumnList(command)) {
      expect(command).toBeInstanceOf(ColumnList)
      expect(command.table).toBe(table)
    }
  })
})
