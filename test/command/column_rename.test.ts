import { ColumnRename, isColumnRename } from '@/command/column_rename'
import { createCommand } from '@/command/groonga_command'

describe('column_rename', () => {
  const table = 'Users'
  const name = 'name'
  const new_name = 'nick'

  test('ColumnRename.command_name', () => {
    const command = new ColumnRename({})
    expect(command.command_name).toBe('column_rename')
  })

  test('new ColumnRename({}, ordered_arguments)', () => {
    const command = new ColumnRename({}, [
      table, //
      name,
      new_name,
    ])

    expect(command.arguments).toEqual({
      table,
      name,
      new_name,
    })
  })

  test('ColumnRename.table', () => {
    const command = new ColumnRename({ table })
    expect(command.table).toBe(table)
  })

  test('ColumnRename.name', () => {
    const command = new ColumnRename({ name })
    expect(command.name).toBe(name)
  })

  test('ColumnRename.new_name', () => {
    const command = new ColumnRename({ new_name })
    expect(command.new_name).toBe(new_name)
  })

  test('isColumnRename', () => {
    const command = createCommand('column_rename', { new_name })
    expect(isColumnRename(command)).toBe(true)
    if (isColumnRename(command)) {
      expect(command).toBeInstanceOf(ColumnRename)
      expect(command.new_name).toBe(new_name)
    }
  })
})
