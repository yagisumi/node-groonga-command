import { ColumnRemove, isColumnRemove } from '@/command/column_remove'
import { createCommand } from '@/command/groonga_command'

describe('column_remove', () => {
  const table = 'Users'
  const name = 'age'

  test('ColumnRemove.command_name', () => {
    const command = new ColumnRemove({})
    expect(command.command_name).toBe('column_remove')
  })

  test('new ColumnRemove({}, ordered_arguments)', () => {
    const command = new ColumnRemove({}, [
      table, //
      name,
    ])

    expect(command.arguments).toEqual({
      table,
      name,
    })
  })

  test('ColumnRemove.table', () => {
    const command = new ColumnRemove({ table })
    expect(command.table).toBe(table)
  })

  test('ColumnRemove.name', () => {
    const command = new ColumnRemove({ name })
    expect(command.name).toBe(name)
  })

  test('isColumnRemove', () => {
    const command = createCommand('column_remove', { name })
    expect(isColumnRemove(command)).toBe(true)
    if (isColumnRemove(command)) {
      expect(command).toBeInstanceOf(ColumnRemove)
      expect(command.name).toBe(name)
    }
  })
})
