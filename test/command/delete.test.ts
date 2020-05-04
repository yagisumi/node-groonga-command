import { Delete, isDelete } from '@/command/delete'
import { createCommand } from '@/command/groonga_command'

describe('delete', () => {
  const table = 'Users'
  const key = 'Alice'
  const id = '29'
  const filter = 'age == 20'

  test('Delete.command_name', () => {
    const command = new Delete({})
    expect(command.command_name).toBe('delete')
  })

  test('new Delete({}, ordered_arguments)', () => {
    const command = new Delete({}, [
      table, //
      key,
      id,
      filter,
    ])

    expect(command.arguments).toEqual({
      table,
      key,
      id,
      filter,
    })
  })

  test.each([
    [undefined, {}],
    [table, { table }],
  ])('Delete.table', (expected, args) => {
    const command = new Delete(args)
    expect(command.table).toEqual(expected)
  })

  test('isDelete', () => {
    const command = createCommand('delete', { table })
    expect(isDelete(command)).toBe(true)
    if (isDelete(command)) {
      expect(command).toBeInstanceOf(Delete)
      expect(command.table).toBe(table)
    }
  })
})
