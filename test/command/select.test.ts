import { Select, isSelect } from '@/command/select'
import { createCommand } from '@/command/groonga_command'
import { parse_labeled_drilldowns } from '@/command/drilldownable'

describe('select', () => {
  const table = 'Users'
  const match_columns = 'name * 10 || description'
  const query = 'groonga'
  const filter = 'age >= 18'
  const scorer = '_score = age'
  const sortby = '_score'
  const output_columns = '_key, name'
  const offset = '10'
  const limit = '20'
  const drilldown = 'name'
  const drilldown_sortby = '_nsubrecs'
  const drilldown_output_columns = 'name, _nsubrecs'
  const drilldown_offset = '5'
  const drilldown_limit = '10'
  const cache = 'no'
  const match_escalation_threshold = '-1'
  const query_expansion = 'deprecated'
  const query_flags = 'ALLOW_LEADING_NOT'
  const query_expander = 'Terms.synonym'
  const adjuster = 'tag * 10'
  const drilldown_calc_types = 'MIN, MAX'
  const drilldown_calc_target = 'age'
  const drilldown_filter = '_nsubrecs > 1'
  const sort_keys = '-_score'
  const drilldown_sort_keys = '-_nsubrecs'

  test('Select.command_name', () => {
    const command = new Select({})
    expect(command.command_name).toBe('select')
  })

  test('new Select({}, ordered_arguments)', () => {
    const command = new Select({}, [
      table, //
      match_columns,
      query,
      filter,
      scorer,
      sortby,
      output_columns,
      offset,
      limit,
      drilldown,
      drilldown_sortby,
      drilldown_output_columns,
      drilldown_offset,
      drilldown_limit,
      cache,
      match_escalation_threshold,
      query_expansion,
      query_flags,
      query_expander,
      adjuster,
      drilldown_calc_types,
      drilldown_calc_target,
      drilldown_filter,
      sort_keys,
      drilldown_sort_keys,
    ])

    expect(command.arguments).toEqual({
      table,
      match_columns,
      query,
      filter,
      scorer,
      sortby,
      output_columns,
      offset,
      limit,
      drilldown,
      drilldown_sortby,
      drilldown_output_columns,
      drilldown_offset,
      drilldown_limit,
      cache,
      match_escalation_threshold,
      query_expansion,
      query_flags,
      query_expander,
      adjuster,
      drilldown_calc_types,
      drilldown_calc_target,
      drilldown_filter,
      sort_keys,
      drilldown_sort_keys,
    })
  })

  test('Select.scorer', () => {
    const command = new Select({ scorer })
    expect(command.scorer).toBe(scorer)
  })

  test('Select.sortby', () => {
    const command = new Select({ sortby })
    expect(command.sortby).toBe(sortby)
  })

  test('Select.filter', () => {
    const command = new Select({ filter })
    expect(command.filter).toBe(filter)
  })

  test('Select.query', () => {
    const command = new Select({ query })
    expect(command.query).toBe(query)
  })

  test('Select.output_columns', () => {
    const command = new Select({ output_columns })
    expect(command.output_columns).toEqual(['_key', 'name'])
  })

  test.each([
    [
      [
        'geo_in_rectangle(location,' + '"35.73360x139.7394","62614x139.7714")',
        'type == "たいやき"',
        'type == "和菓子"',
        'keyword @ "たいやき"',
        'keyword @ "白"',
        'keyword @ "養殖"',
      ],
      {
        filter:
          'geo_in_rectangle(location,' +
          '"35.73360x139.7394","62614x139.7714") && ' +
          '((type == "たいやき" || type == "和菓子")) && ' +
          'keyword @ "たいやき" &! keyword @ "白" &! keyword @ "養殖"',
      },
    ],
    [[], {}],
  ])('Select.conditions', (expected, args) => {
    const command = new Select(args)
    expect(command.conditions).toEqual(expected)
  })

  test.each([
    [['-_score', '_key'], { sort_keys: '-_score,_key' }],
    [['-_score', '_key'], { sortby: '-_score,_key' }],
  ])('Select.sort_keys', (expected, args) => {
    const command = new Select(args)
    expect(command.sort_keys).toEqual(expected)
  })

  test('Select.drilldown', () => {
    const command = new Select({ drilldown })
    expect(command.drilldown).toBe(drilldown)
  })

  test('Select.drilldown_sortby', () => {
    const command = new Select({ drilldown_sortby })
    expect(command.drilldown_sortby).toBe(drilldown_sortby)
  })

  test('Select.drilldown_output_columns', () => {
    // incompatible
    const command = new Select({ drilldown_output_columns })
    expect(command.drilldown_output_columns).toEqual(['name', '_nsubrecs'])
  })

  test('Select.drilldown_offset', () => {
    const command = new Select({ drilldown_offset })
    expect(command.drilldown_offset).toBe(parseInt(drilldown_offset))
  })

  test('Select.drilldown_limit', () => {
    const command = new Select({ drilldown_limit })
    expect(command.drilldown_limit).toBe(parseInt(drilldown_limit))
  })

  test('Select.drilldown_calc_types', () => {
    const command = new Select({ drilldown_calc_types })
    expect(command.drilldown_calc_types).toBe(drilldown_calc_types)
  })

  test('Select.drilldown_calc_target', () => {
    const command = new Select({ drilldown_calc_target })
    expect(command.drilldown_calc_target).toBe(drilldown_calc_target)
  })

  test('Select.drilldown_filter', () => {
    const command = new Select({ drilldown_filter })
    expect(command.drilldown_filter).toBe(drilldown_filter)
  })

  test.each([
    [['-_nsubrecs', '_key'], { drilldown_sort_keys: '-_nsubrecs,_key' }],
    [['-_nsubrecs', '_key'], { drilldown_sortby: '-_nsubrecs,_key' }],
  ])('Select.drilldown_sort_keys', (expected, args) => {
    const command = new Select(args)
    expect(command.drilldown_sort_keys).toEqual(expected)
  })

  test('Select.labeled_drilldowns', () => {
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

    expect(parse_labeled_drilldowns(parameters)).toEqual(drilldowns)

    const command = new Select(parameters)
    expect(command.labeled_drilldowns).toEqual(drilldowns)
  })

  test('Select.slices', () => {
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

    const slices = {
      book_alice: {
        label: 'book_alice',
        match_columns: ['tag'], // incompatible
        output_columns: [], // incompatible
        query: 'Book',
        query_expander: 'Synonyms.tag',
        query_flags: ['ALLOW_COLUMN', 'ALLOW_LEADING_NOT'],
        filter: 'user == "alice"',
        sort_keys: ['_score', 'user'],
        offset: 10,
        limit: 25,
        labeled_drilldowns: {},
      },
    }

    const command = new Select(parameters)
    expect(command.slices).toEqual(slices)
  })

  test('isSelect', () => {
    const command = createCommand('select', { query })
    expect(isSelect(command)).toBe(true)
    if (isSelect(command)) {
      expect(command).toBeInstanceOf(Select)
      expect(command.query).toBe(query)
    }
  })
})
