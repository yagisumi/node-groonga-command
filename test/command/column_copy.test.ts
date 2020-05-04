import { ColumnCopy, isColumnCopy } from '@/command/column_copy'
import { createCommand } from '@/command/groonga_command'

describe('column_copy', () => {
  const from_table = 'Users'
  const from_name = 'age_text'
  const to_table = 'TypesUsers'
  const to_name = 'age_uint8'

  test('ColumnCopy.command_name', () => {
    const command = new ColumnCopy({})
    expect(command.command_name).toBe('column_copy')
  })

  test('new ColumnCopy({}, ordered_arguments)', () => {
    const command = new ColumnCopy({}, [
      from_table, //
      from_name,
      to_table,
      to_name,
    ])

    expect(command.arguments).toEqual({
      from_table,
      from_name,
      to_table,
      to_name,
    })
  })

  test('ColumnCopy.from_table', () => {
    const command = new ColumnCopy({ from_table })
    expect(command.from_table).toBe(from_table)
  })

  test('ColumnCopy.from_name', () => {
    const command = new ColumnCopy({ from_name })
    expect(command.from_name).toBe(from_name)
  })

  test('ColumnCopy.to_table', () => {
    const command = new ColumnCopy({ to_table })
    expect(command.to_table).toBe(to_table)
  })

  test('ColumnCopy.to_name', () => {
    const command = new ColumnCopy({ to_name })
    expect(command.to_name).toBe(to_name)
  })

  test('isColumnCopy', () => {
    const command = createCommand('column_copy', { to_name })
    expect(isColumnCopy(command)).toBe(true)
    if (isColumnCopy(command)) {
      expect(command).toBeInstanceOf(ColumnCopy)
      expect(command.to_name).toBe(to_name)
    }
  })
})
