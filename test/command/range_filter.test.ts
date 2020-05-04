import { RangeFilter, isRangeFilter } from '@/command/range_filter'
import { createCommand } from '@/command/groonga_command'

describe('range_filter', () => {
  const table = 'Logs'
  const column = 'timestamp'
  const min = '2015-01-26 00:00:00'
  const min_border = 'include'
  const max = '2015-01-27 00:00:00'
  const max_border = 'exclude'
  const offset = '10'
  const limit = '20'
  const filter = 'value == 10'
  const output_columns = '_key, timestamp'

  test('RangeFilter.command_name', () => {
    const command = new RangeFilter({})
    expect(command.command_name).toBe('range_filter')
  })

  test('new RangeFilter({}, ordered_arguments)', () => {
    const command = new RangeFilter({}, [
      table, //
      column,
      min,
      min_border,
      max,
      max_border,
      offset,
      limit,
      filter,
      output_columns,
    ])

    expect(command.arguments).toEqual({
      table,
      column,
      min,
      min_border,
      max,
      max_border,
      offset,
      limit,
      filter,
      output_columns,
    })
  })

  test('RangeFilter.table', () => {
    const command = new RangeFilter({ table })
    expect(command.table).toBe(table)
  })

  test('RangeFilter.column', () => {
    const command = new RangeFilter({ column })
    expect(command.column).toBe(column)
  })

  test('RangeFilter.min', () => {
    const command = new RangeFilter({ min })
    expect(command.min).toBe(min)
  })

  test('RangeFilter.min_border', () => {
    const command = new RangeFilter({ min_border })
    expect(command.min_border).toBe(min_border)
  })

  test('RangeFilter.max', () => {
    const command = new RangeFilter({ max })
    expect(command.max).toBe(max)
  })

  test('RangeFilter.max_border', () => {
    const command = new RangeFilter({ max_border })
    expect(command.max_border).toBe(max_border)
  })

  test('RangeFilter.offset', () => {
    const command = new RangeFilter({ offset })
    expect(command.offset).toBe(parseInt(offset))
  })

  test('RangeFilter.limit', () => {
    const command = new RangeFilter({ limit })
    expect(command.limit).toBe(parseInt(limit))
  })

  test('RangeFilter.filter', () => {
    const command = new RangeFilter({ filter })
    expect(command.filter).toBe(filter)
  })

  test('RangeFilter.output_columns', () => {
    // incompatible
    const command = new RangeFilter({ output_columns })
    expect(command.output_columns).toEqual(['_key', 'timestamp'])
  })

  test('isRangeFilter', () => {
    const command = createCommand('range_filter', { max_border })
    expect(isRangeFilter(command)).toBe(true)
    if (isRangeFilter(command)) {
      expect(command).toBeInstanceOf(RangeFilter)
      expect(command.max_border).toBe(max_border)
    }
  })
})
