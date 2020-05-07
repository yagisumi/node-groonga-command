import { LogicalSelect, isLogicalSelect } from '@/command/logical_select'
import { createCommand } from '@/command/groonga_command'
import { Select } from '@/command/select'

describe('logical_select', () => {
  const logical_table = 'Logs'
  const shard_key = 'timestamp'
  const min = '2015-02-12 00:00:00'
  const min_border = 'include'
  const max = '2015-02-13 00:00:00'
  const max_border = 'exclude'
  const filter = "action == 'Shutdown'"
  const sortby = '_score'
  const output_columns = '_key, name'
  const offset = '10'
  const limit = '20'
  const drilldown = 'name'
  const drilldown_sortby = '_nsubrecs'
  const drilldown_output_columns = 'name, _nsubrecs'
  const drilldown_offset = '5'
  const drilldown_limit = '10'
  const drilldown_calc_types = 'MIN,AVG'
  const drilldown_calc_target = 'n_occurred'
  const sort_keys = '-_score'

  test('LogicalSelect.command_name', () => {
    const command = new LogicalSelect({})
    expect(command.command_name).toBe('logical_select')
  })

  test('new LogicalSelect({}, ordered_arguments)', () => {
    const command = new LogicalSelect({}, [
      logical_table,
      shard_key,
      min,
      min_border,
      max,
      max_border,
      filter,
      sortby,
      output_columns,
      offset,
      limit,
      drilldown,
      drilldown_sortby,
      drilldown_output_columns,
      drilldown_offset,
      drilldown_limit,
      drilldown_calc_types,
      drilldown_calc_target,
      sort_keys,
    ])

    expect(command.arguments).toEqual({
      logical_table,
      shard_key,
      min,
      min_border,
      max,
      max_border,
      filter,
      sortby,
      output_columns,
      offset,
      limit,
      drilldown,
      drilldown_sortby,
      drilldown_output_columns,
      drilldown_offset,
      drilldown_limit,
      drilldown_calc_types,
      drilldown_calc_target,
      sort_keys,
    })
  })

  test('LogicalSelect.logical_table', () => {
    const command = new LogicalSelect({ logical_table })
    expect(command.logical_table).toBe(logical_table)
  })

  test('LogicalSelect.shard_key', () => {
    const command = new LogicalSelect({ shard_key })
    expect(command.shard_key).toBe(shard_key)
  })

  test('LogicalSelect.min', () => {
    const command = new LogicalSelect({ min })
    expect(command.min).toBe(min)
  })

  test('LogicalSelect.min_border', () => {
    const command = new LogicalSelect({ min_border })
    expect(command.min_border).toBe(min_border)
  })

  test('LogicalSelect.max', () => {
    const command = new LogicalSelect({ max })
    expect(command.max).toBe(max)
  })

  test('LogicalSelect.filter', () => {
    const command = new LogicalSelect({ filter })
    expect(command.filter).toBe(filter)
  })

  test('LogicalSelect.sortby', () => {
    const command = new LogicalSelect({ sortby })
    expect(command.sortby).toBe(sortby)
  })

  test('LogicalSelect.output_columns', () => {
    const command = new LogicalSelect({ output_columns })
    expect(command.output_columns).toEqual(['_key', 'name'])
  })

  test('LogicalSelect.offset', () => {
    const command = new LogicalSelect({ offset })
    expect(command.offset).toBe(parseInt(offset))
  })

  test('LogicalSelect.limit', () => {
    const command = new LogicalSelect({ limit })
    expect(command.limit).toBe(parseInt(limit))
  })

  test('LogicalSelect.sort_keys', () => {
    const command = new LogicalSelect({ sort_keys })
    expect(command.sort_keys).toEqual(['-_score'])
  })

  test('LogicalSelect.max_border', () => {
    const command = new LogicalSelect({ max_border })
    expect(command.max_border).toBe(max_border)
  })

  test('LogicalSelect.drilldown', () => {
    const command = new LogicalSelect({ drilldown })
    expect(command.drilldown).toBe(drilldown)
  })

  test('LogicalSelect.drilldown_sortby', () => {
    const command = new LogicalSelect({ drilldown_sortby })
    expect(command.drilldown_sortby).toBe(drilldown_sortby)
  })

  test('LogicalSelect.drilldown_output_columns', () => {
    const command = new LogicalSelect({ drilldown_output_columns })
    expect(command.drilldown_output_columns).toEqual(['name', '_nsubrecs'])
  })

  test('LogicalSelect.drilldown_offset', () => {
    const command = new LogicalSelect({ drilldown_offset })
    expect(command.drilldown_offset).toBe(parseInt(drilldown_offset))
  })

  test('LogicalSelect.drilldown_limit', () => {
    const command = new LogicalSelect({ drilldown_limit })
    expect(command.drilldown_limit).toBe(parseInt(drilldown_limit))
  })

  test('LogicalSelect.drilldown_calc_types', () => {
    const command = new LogicalSelect({ drilldown_calc_types })
    expect(command.drilldown_calc_types).toBe(drilldown_calc_types)
  })

  test('LogicalSelect.drilldown_calc_target', () => {
    const command = new LogicalSelect({ drilldown_calc_target })
    expect(command.drilldown_calc_target).toBe(drilldown_calc_target)
  })

  test('LogicalSelect.drilldown_filter', () => {
    const command = new LogicalSelect({ drilldown_filter: '_nsubrecs > 1' })
    expect(command.drilldown_filter).toBe('_nsubrecs > 1')
  })

  test('LogicalSelect.drilldown_sort_keys', () => {
    const command = new LogicalSelect({ drilldown_sort_keys: '-_nsubrecs,_key' })
    expect(command.drilldown_sort_keys).toEqual(['-_nsubrecs', '_key'])
  })

  test('LogicalSelect.drilldown_sort_keys with drilldown_sortby', () => {
    const command = new LogicalSelect({ drilldown_sortby: '-_nsubrecs,_key' })
    expect(command.drilldown_sort_keys).toEqual(['-_nsubrecs', '_key'])
  })

  test('LogicalSelect.labeled_drilldowns', () => {
    const parameters = {
      'drilldowns[tag].keys': 'tag',
      'drilldowns[tag].sort_keys': '-_nsubrecs,_key',
      'drilldowns[tag].output_columns': '_key,_nsubrecs,_min,_max',
      'drilldowns[tag].offset': '1',
      'drilldowns[tag].limit': '10',
      'drilldowns[tag].calc_types': 'MIN,MAX',
      'drilldowns[tag].calc_target': '_nsubrecs',
      'drilldowns[tag].filter': '_nsubrecs > 1',

      'drilldowns[author_tag].keys': 'author,tag',
      'drilldowns[author_tag].sort_keys': '_value.author',
      'drilldowns[author_tag].output_columns': '_value.author,_nsubrecs',
    }

    const command = new Select(parameters)

    const drilldowns = {
      author_tag: {
        label: 'author_tag',
        keys: ['author', 'tag'],
        sort_keys: ['_value.author'],
        output_columns: ['_value.author', '_nsubrecs'],
        calc_types: [], // incompatible
      },
      tag: {
        label: 'tag',
        keys: ['tag'],
        sort_keys: ['-_nsubrecs', '_key'],
        output_columns: ['_key', '_nsubrecs', '_min', '_max'],
        offset: 1,
        limit: 10,
        calc_types: ['MIN', 'MAX'],
        calc_target: '_nsubrecs',
        filter: '_nsubrecs > 1',
      },
    }

    expect(command.labeled_drilldowns).toEqual(drilldowns)
  })

  test('LogicalSelect.slices [full]', () => {
    const parameters = {
      'slices[book_alice].match_columns': 'tag',
      'slices[book_alice].query': 'Book',
      'slices[book_alice].query_expander': 'Synonyms.tag',
      'slices[book_alice].query_flags': 'ALLOW_COLUMN|ALLOW_LEADING_NOT',
      'slices[book_alice].filter': 'user == "alice"',
      'slices[book_alice].sort_keys': '_score, user',
      'slices[book_alice].offset': '10',
      'slices[book_alice].limit': '25',
    }

    const command = new Select(parameters)

    const slices = {
      book_alice: {
        label: 'book_alice',
        match_columns: ['tag'],
        query: 'Book',
        query_expander: 'Synonyms.tag',
        query_flags: ['ALLOW_COLUMN', 'ALLOW_LEADING_NOT'],
        filter: 'user == "alice"',
        sort_keys: ['_score', 'user'],
        offset: 10,
        limit: 25,
        output_columns: [], // incompatible
        labeled_drilldowns: {}, // incompatible
      },
    }

    expect(command.slices).toEqual(slices)
  })

  test('LogicalSelect.slices [multiple]', () => {
    const parameters = {
      'slices[groonga].query': 'tag:Groonga',
      'slices[rroonga].filter': 'tag == Rroonga',
      'slices[rroonga].sort_keys': 'date',
      'slices[rroonga].output_columns': '_key, date',
    }

    const command = new Select(parameters)

    const slices = {
      groonga: {
        label: 'groonga',
        query: 'tag:Groonga',
        match_columns: [], // incompatible
        output_columns: [], // incompatible
        query_flags: [], // incompatible
        sort_keys: [], // incompatible
        labeled_drilldowns: {}, // incompatible
      },
      rroonga: {
        label: 'rroonga',
        filter: 'tag == Rroonga',
        sort_keys: ['date'],
        output_columns: ['_key', 'date'],
        match_columns: [], // incompatible
        query_flags: [], // incompatible
        labeled_drilldowns: {}, // incompatible
      },
    }

    expect(command.slices).toEqual(slices)
  })

  test('isLogicalSelect', () => {
    const command = createCommand('logical_select', { drilldown_calc_target })
    expect(isLogicalSelect(command)).toBe(true)
    if (isLogicalSelect(command)) {
      expect(command).toBeInstanceOf(LogicalSelect)
      expect(command.drilldown_calc_target).toBe(drilldown_calc_target)
    }
  })
})
