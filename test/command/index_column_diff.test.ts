import { IndexColumnDiff, isIndexColumnDiff } from '@/command/index_column_diff'
import { createCommand } from '@/command/groonga_command'

describe('index_column_diff', () => {
  const table = 'Lexicon'
  const name = 'content_index'

  test('IndexColumnDiff.command_name', () => {
    const command = new IndexColumnDiff({})
    expect(command.command_name).toBe('index_column_diff')
  })

  test('new IndexColumnDiff({}, ordered_arguments)', () => {
    const command = new IndexColumnDiff({}, [
      table, //
      name,
    ])

    expect(command.arguments).toEqual({
      table,
      name,
    })
  })

  test('IndexColumnDiff.table', () => {
    const command = new IndexColumnDiff({ table })
    expect(command.table).toBe(table)
  })

  test('IndexColumnDiff.name', () => {
    const command = new IndexColumnDiff({ name })
    expect(command.name).toBe(name)
  })

  test('isIndexColumnDiff', () => {
    const command = createCommand('index_column_diff', { name })
    expect(isIndexColumnDiff(command)).toBe(true)
    if (isIndexColumnDiff(command)) {
      expect(command).toBeInstanceOf(IndexColumnDiff)
      expect(command.name).toBe(name)
    }
  })
})
