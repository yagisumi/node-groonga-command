import { LogicalRangeFilter, isLogicalRangeFilter } from '@/command/logical_range_filter'
import { createCommand } from '@/command/groonga_command'

describe('logical_range_filter', () => {
  const logical_table = 'Logs'
  const shard_key = 'timestamp'
  const min = '2015-02-12 00:00:00'
  const min_border = 'include'
  const max = '2015-02-13 00:00:00'
  const max_border = 'exclude'
  const order = 'ascending'
  const offset = '10'
  const limit = '20'
  const filter = 'value == 10'
  const output_columns = '_key, timestamp'
  const use_range_index = 'yes'
  const post_filter = '_score > 10'
  const sort_keys = 'timestamp, -_score'

  test('LogicalRangeFilter.command_name', () => {
    const command = new LogicalRangeFilter({})
    expect(command.command_name).toBe('logical_range_filter')
  })

  test('new LogicalRangeFilter({}, ordered_arguments)', () => {
    const command = new LogicalRangeFilter({}, [
      logical_table, //
      shard_key,
      min,
      min_border,
      max,
      max_border,
      order,
      offset,
      limit,
      filter,
      output_columns,
      use_range_index,
      post_filter,
      sort_keys,
    ])

    expect(command.arguments).toEqual({
      logical_table,
      shard_key,
      min,
      min_border,
      max,
      max_border,
      order,
      offset,
      limit,
      filter,
      output_columns,
      use_range_index,
      post_filter,
      sort_keys,
    })
  })

  test('LogicalRangeFilter.logical_table', () => {
    const command = new LogicalRangeFilter({ logical_table })
    expect(command.logical_table).toBe(logical_table)
  })

  test('LogicalRangeFilter.shard_key', () => {
    const command = new LogicalRangeFilter({ shard_key })
    expect(command.shard_key).toBe(shard_key)
  })

  test('LogicalRangeFilter.min', () => {
    const command = new LogicalRangeFilter({ min })
    expect(command.min).toBe(min)
  })

  test('LogicalRangeFilter.min_border', () => {
    const command = new LogicalRangeFilter({ min_border })
    expect(command.min_border).toBe(min_border)
  })

  test('LogicalRangeFilter.max', () => {
    const command = new LogicalRangeFilter({ max })
    expect(command.max).toBe(max)
  })

  test('LogicalRangeFilter.max_border', () => {
    const command = new LogicalRangeFilter({ max_border })
    expect(command.max_border).toBe(max_border)
  })

  test('LogicalRangeFilter.order', () => {
    const command = new LogicalRangeFilter({ order })
    expect(command.order).toBe(order)
  })

  test('LogicalRangeFilter.offset', () => {
    const command = new LogicalRangeFilter({ offset })
    expect(command.offset).toBe(parseInt(offset))
  })

  test('LogicalRangeFilter.limit', () => {
    const command = new LogicalRangeFilter({ limit })
    expect(command.limit).toBe(parseInt(limit))
  })

  test('LogicalRangeFilter.filter', () => {
    const command = new LogicalRangeFilter({ filter })
    expect(command.filter).toBe(filter)
  })

  test('LogicalRangeFilter.output_columns', () => {
    // incompatible
    const command = new LogicalRangeFilter({ output_columns })
    expect(command.output_columns).toEqual(['_key', 'timestamp'])
  })

  test.each([
    [true, { use_range_index: 'yes' }],
    [false, { use_range_index: 'no' }],
    [undefined, {}],
    [undefined, { use_range_index: 'invalid' }],
  ])('LogicalRangeFilter.use_range_index', (expected, args) => {
    const command = new LogicalRangeFilter(args)
    expect(command.use_range_index).toEqual(expected)
  })

  test('LogicalRangeFilter.post_filter', () => {
    const command = new LogicalRangeFilter({ post_filter })
    expect(command.post_filter).toBe(post_filter)
  })

  test('LogicalRangeFilter.sort_keys', () => {
    const command = new LogicalRangeFilter({ sort_keys })
    expect(command.sort_keys).toEqual(['timestamp', '-_score'])
  })

  test('isLogicalRangeFilter', () => {
    const command = createCommand('logical_range_filter', { post_filter })
    expect(isLogicalRangeFilter(command)).toBe(true)
    if (isLogicalRangeFilter(command)) {
      expect(command).toBeInstanceOf(LogicalRangeFilter)
      expect(command.post_filter).toBe(post_filter)
    }
  })
})
