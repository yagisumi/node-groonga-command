import { Load, isLoad } from '@/command/load'
import { createCommand } from '@/command/groonga_command'

describe('load', () => {
  const values = '[["Alice"], ["Bob"]]'
  const table = 'Users'
  const columns = '_key'
  const ifexists = '_key == "Alice"'
  const input_type = 'json'
  const each = 'strlen(_key)'
  const output_ids = 'no'

  test('Load.command_name', () => {
    const command = new Load({})
    expect(command.command_name).toBe('load')
  })

  test('new Load({}, ordered_arguments)', () => {
    const command = new Load({}, [
      values, //
      table,
      columns,
      ifexists,
      input_type,
      each,
      output_ids,
    ])

    expect(command.arguments).toEqual({
      values,
      table,
      columns,
      ifexists,
      input_type,
      each,
      output_ids,
    })
  })

  test.each([
    [undefined, {}],
    [table, { table }],
  ])('Load.table', (expected, args) => {
    const command = new Load(args)
    expect(command.table).toBe(expected)
  })

  test('Load.table=', () => {
    const command = new Load({ table })
    expect(command.table).toBe(table)

    command.table = 'test'
    expect(command.table).toBe('test')

    command.table = undefined
    expect(command.table).toBeUndefined()
  })

  test.each([
    [undefined, {}],
    [[], { values: '[]' }],
    [[['Alice']], { values: '[["Alice"]]' }],
    [[{ key: 'Alice' }], { values: '[{"key": "Alice"}]' }],
  ])('Load.values', (expected, args) => {
    const command = new Load(args)
    expect(command.values).toEqual(expected)
  })

  test('Load.values=', () => {
    // incompatible
    const command = new Load({ values: '[{"key": "Alice"}]' })
    expect(command.values).toEqual([{ key: 'Alice' }])
    command.values = [['Alice']]
    expect(command.values).toEqual([['Alice']])
  })

  test.each([
    [true, { output_ids: 'yes' }],
    [false, {}],
  ])('Load.is_output_ids()', (expected, args) => {
    const command = new Load(args)
    expect(command.is_output_ids()).toBe(expected)
  })

  test('Load.columns', () => {
    const command = new Load({ columns })
    expect(command.columns).toEqual(['_key'])
  })

  test('Load.columns=', () => {
    const command = new Load({ columns })
    expect(command.columns).toEqual(['_key'])

    command.columns = []
    expect(command.columns).toEqual([])
  })

  columns

  test('isLoad', () => {
    const command = createCommand('load', { table })
    expect(isLoad(command)).toBe(true)
    if (isLoad(command)) {
      expect(command).toBeInstanceOf(Load)
      expect(command.table).toBe(table)
    }
  })
})
