import { QueryExpand, isQueryExpand } from '@/command/query_expand'
import { createCommand } from '@/command/groonga_command'

describe('query_expand', () => {
  const expander = 'QueryExpanderTSV'
  const query = 'Rroonga'
  const flags = 'ALLOW_PRAGMA|ALLOW_COLUMN'

  test('QueryExpand.command_name', () => {
    const command = new QueryExpand({})
    expect(command.command_name).toBe('query_expand')
  })

  test('new QueryExpand({}, ordered_arguments)', () => {
    const command = new QueryExpand({}, [
      expander, //
      query,
      flags,
    ])

    expect(command.arguments).toEqual({
      expander,
      query,
      flags,
    })
  })

  test('QueryExpand.expander', () => {
    const command = new QueryExpand({ expander })
    expect(command.expander).toBe(expander)
  })

  test('QueryExpand.query', () => {
    const command = new QueryExpand({ query })
    expect(command.query).toBe(query)
  })

  test.each([
    [['ALLOW_COLUMN'], { flags: 'ALLOW_COLUMN' }],
    [['ALLOW_UPDATE', 'ALLOW_COLUMN'], { flags: 'ALLOW_UPDATE|ALLOW_COLUMN' }],
    [['ALLOW_UPDATE', 'ALLOW_COLUMN'], { flags: 'ALLOW_UPDATE | ALLOW_COLUMN' }],
    [['ALLOW_UPDATE', 'ALLOW_COLUMN'], { flags: 'ALLOW_UPDATE ALLOW_COLUMN' }],
  ])('QueryExpand.equals(cmd)', (expected, args) => {
    const command = new QueryExpand(args)
    expect(command.flags).toEqual(expected)
  })

  test.each([
    [true, { flags: 'ALLOW_PRAGMA' }],
    [false, { flags: 'ALLOW_COLUMN' }],
  ])('QueryExpand.ALLOW_PRAGMA', (expected, args) => {
    const command = new QueryExpand(args)
    expect(command.ALLOW_PRAGMA).toEqual(expected)
  })

  test.each([
    [true, { flags: 'ALLOW_COLUMN' }],
    [false, { flags: 'ALLOW_UPDATE' }],
  ])('QueryExpand.ALLOW_COLUMN', (expected, args) => {
    const command = new QueryExpand(args)
    expect(command.ALLOW_COLUMN).toEqual(expected)
  })

  test.each([
    [true, { flags: 'ALLOW_UPDATE' }],
    [false, { flags: 'ALLOW_PRAGMA' }],
  ])('QueryExpand.ALLOW_UPDATE', (expected, args) => {
    const command = new QueryExpand(args)
    expect(command.ALLOW_UPDATE).toEqual(expected)
  })

  test.each([
    [true, { flags: 'ALLOW_LEADING_NOT' }],
    [false, { flags: 'ALLOW_PRAGMA' }],
  ])('QueryExpand.ALLOW_LEADING_NOT', (expected, args) => {
    const command = new QueryExpand(args)
    expect(command.ALLOW_LEADING_NOT).toEqual(expected)
  })

  test.each([
    [true, { flags: 'NONE' }],
    [false, { flags: 'ALLOW_PRAGMA' }],
  ])('QueryExpand.NONE', (expected, args) => {
    const command = new QueryExpand(args)
    expect(command.NONE).toEqual(expected)
  })

  test('isQueryExpand', () => {
    const command = createCommand('query_expand', { query })
    expect(isQueryExpand(command)).toBe(true)
    if (isQueryExpand(command)) {
      expect(command).toBeInstanceOf(QueryExpand)
      expect(command.query).toBe(query)
    }
  })
})
