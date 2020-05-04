import { TableCopy, isTableCopy } from '@/command/table_copy'
import { createCommand } from '@/command/groonga_command'

describe('table_copy', () => {
  const from_name = 'Users'
  const to_name = 'TypesUsers'

  test('TableCopy.command_name', () => {
    const command = new TableCopy({})
    expect(command.command_name).toBe('table_copy')
  })

  test('new TableCopy({}, ordered_arguments)', () => {
    const command = new TableCopy({}, [
      from_name, //
      to_name,
    ])

    expect(command.arguments).toEqual({
      from_name,
      to_name,
    })
  })

  test('TableCopy.from_name', () => {
    const command = new TableCopy({ from_name })
    expect(command.from_name).toBe(from_name)
  })

  test('TableCopy.to_name', () => {
    const command = new TableCopy({ to_name })
    expect(command.to_name).toBe(to_name)
  })

  test('isTableCopy', () => {
    const command = createCommand('table_copy', { to_name })
    expect(isTableCopy(command)).toBe(true)
    if (isTableCopy(command)) {
      expect(command).toBeInstanceOf(TableCopy)
      expect(command.to_name).toBe(to_name)
    }
  })
})
