import { ColumnCreate, isColumnCreate } from '@/command/column_create'
import { createCommand } from '@/command/groonga_command'

describe('column_create', () => {
  const table = 'Lexicon'
  const name = 'content_index'
  const flags = 'COLUMN_INDEX'
  const type = 'Posts'
  const source = 'content'

  test('ColumnCreate.command_name', () => {
    const command = new ColumnCreate({})
    expect(command.command_name).toBe('column_create')
  })

  test('new ColumnCreate({}, ordered_arguments)', () => {
    const command = new ColumnCreate({}, [
      table, //
      name,
      flags,
      type,
      source,
    ])

    expect(command.arguments).toEqual({
      table,
      name,
      flags,
      type,
      source,
    })
  })

  test('ColumnCreate.table', () => {
    const command = new ColumnCreate({ table })
    expect(command.table).toBe(table)
  })

  test('ColumnCreate.name', () => {
    const command = new ColumnCreate({ name })
    expect(command.name).toBe(name)
  })

  test.each([
    [['COLUMN_INDEX', 'WITH_POSITION'], { flags: 'COLUMN_INDEX|WITH_POSITION' }],
    [['COLUMN_VECTOR'], { flags: 'COLUMN_VECTOR' }],
    [[], {}],
  ])('ColumnCreate.flags', (expected, args) => {
    const command = new ColumnCreate(args)
    expect(command.flags).toEqual(expected)
  })

  test.each([
    [true, 'COLUMN_SCALAR'],
    [false, 'COLUMN_VECTOR'],
  ])('ColumnCreate.COLUMN_SCALAR', (expected, flags) => {
    const command = new ColumnCreate({ flags })
    expect(command.COLUMN_SCALAR).toBe(expected)
  })

  test.each([
    [true, 'COLUMN_VECTOR'],
    [false, 'COLUMN_INDEX'],
  ])('ColumnCreate.COLUMN_VECTOR', (expected, flags) => {
    const command = new ColumnCreate({ flags })
    expect(command.COLUMN_VECTOR).toBe(expected)
  })

  test.each([
    [true, 'COLUMN_INDEX'],
    [false, 'COLUMN_SCALAR'],
  ])('ColumnCreate.COLUMN_INDEX', (expected, flags) => {
    const command = new ColumnCreate({ flags })
    expect(command.COLUMN_INDEX).toBe(expected)
  })

  test.each([
    [true, 'COLUMN_INDEX|WITH_SECTION'],
    [false, 'COLUMN_INDEX|WITH_WEIGHT'],
  ])('ColumnCreate.WITH_SECTION', (expected, flags) => {
    const command = new ColumnCreate({ flags })
    expect(command.WITH_SECTION).toBe(expected)
  })

  test.each([
    [true, 'COLUMN_INDEX|WITH_WEIGHT'],
    [false, 'COLUMN_INDEX|WITH_POSITION'],
  ])('ColumnCreate.WITH_WEIGHT', (expected, flags) => {
    const command = new ColumnCreate({ flags })
    expect(command.WITH_WEIGHT).toBe(expected)
  })

  test.each([
    [true, 'COLUMN_INDEX|WITH_POSITION'],
    [false, 'COLUMN_INDEX|WITH_SECTION'],
  ])('ColumnCreate.WITH_POSITION', (expected, flags) => {
    const command = new ColumnCreate({ flags })
    expect(command.WITH_POSITION).toBe(expected)
  })

  test('ColumnCreate.type', () => {
    const command = new ColumnCreate({ type })
    expect(command.type).toBe(type)
  })

  test.each([
    [[], {}],
    [[], { source: '' }],
    [['title'], { source: 'title' }],
    [['title', 'text', 'comment'], { source: 'title, text, comment' }],
  ])('ColumnCreate.sources', (expected, args) => {
    const command = new ColumnCreate(args)
    expect(command.sources).toEqual(expected)
  })

  test('isColumnCreate', () => {
    const command = createCommand('column_create', { type })
    expect(isColumnCreate(command)).toBe(true)
    if (isColumnCreate(command)) {
      expect(command).toBeInstanceOf(ColumnCreate)
      expect(command.type).toBe(type)
    }
  })
})
