import { TableRename, isTableRename } from '@/command/table_rename'
import { createCommand } from '@/command/groonga_command'

describe('table_rename', () => {
  const name = 'Users'
  const new_name = 'People'

  test('TableRename.command_name', () => {
    const command = new TableRename({})
    expect(command.command_name).toBe('table_rename')
  })

  test('new TableRename({}, ordered_arguments)', () => {
    const command = new TableRename({}, [
      name, //
      new_name,
    ])

    expect(command.arguments).toEqual({
      name,
      new_name,
    })
  })

  test('TableRename.name', () => {
    const command = new TableRename({ name })
    expect(command.name).toBe(name)
  })

  test('TableRename.new_name', () => {
    const command = new TableRename({ new_name })
    expect(command.new_name).toBe(new_name)
  })

  test('isTableRename', () => {
    const command = createCommand('table_rename', { new_name })
    expect(isTableRename(command)).toBe(true)
    if (isTableRename(command)) {
      expect(command).toBeInstanceOf(TableRename)
      expect(command.new_name).toBe(new_name)
    }
  })
})
