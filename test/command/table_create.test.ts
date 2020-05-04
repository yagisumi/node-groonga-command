import { TableCreate, isTableCreate } from '@/command/table_create'
import { createCommand } from '@/command/groonga_command'

describe('table_create', () => {
  const name = 'Users'
  const flags = 'TABLE_PAT_KEY'
  const key_type = 'ShortText'
  const value_type = 'UInt32'
  const default_tokenizer = 'TokenBigram'
  const normalizer = 'NormalizerAuto'
  const token_filters = 'TokenFilterStopWord|TokenFilterStem'

  test('TableCreate.command_name', () => {
    const command = new TableCreate({})
    expect(command.command_name).toBe('table_create')
  })

  test('new TableCreate({}, ordered_arguments)', () => {
    const command = new TableCreate({}, [
      name, //
      flags,
      key_type,
      value_type,
      default_tokenizer,
      normalizer,
      token_filters,
    ])

    expect(command.arguments).toEqual({
      name,
      flags,
      key_type,
      value_type,
      default_tokenizer,
      normalizer,
      token_filters,
    })
  })

  test('TableCreate.name', () => {
    const command = new TableCreate({ name })
    expect(command.name).toBe(name)
  })

  test.each([
    [key_type, { key_type }],
    [undefined, {}],
  ])('TableCreate.key_type', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.key_type).toBe(expected)
  })

  test.each([
    [value_type, { value_type }],
    [undefined, {}],
  ])('TableCreate.value_type', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.value_type).toBe(expected)
  })

  test.each([
    [['TABLE_PAT_KEY', 'KEY_WITH_SIS'], { flags: 'TABLE_PAT_KEY|KEY_WITH_SIS' }],
    [['TABLE_NO_KEY'], { flags: 'TABLE_NO_KEY' }],
    [[], {}],
  ])('TableCreate.flags', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.flags).toEqual(expected)
  })

  test.each([
    [true, { flags: 'TABLE_NO_KEY' }],
    [false, { flags: 'TABLE_HASH_KEY' }],
  ])('TableCreate.TABLE_NO_KEY', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.TABLE_NO_KEY).toBe(expected)
  })

  test.each([
    [true, { flags: 'TABLE_HASH_KEY' }],
    [false, { flags: 'TABLE_PAT_KEY' }],
  ])('TableCreate.TABLE_HASH_KEY', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.TABLE_HASH_KEY).toBe(expected)
  })

  test.each([
    [true, { flags: 'TABLE_PAT_KEY' }],
    [false, { flags: 'TABLE_DAT_KEY' }],
  ])('TableCreate.TABLE_PAT_KEY', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.TABLE_PAT_KEY).toBe(expected)
  })

  test.each([
    [true, { flags: 'TABLE_DAT_KEY' }],
    [false, { flags: 'TABLE_NO_KEY' }],
  ])('TableCreate.TABLE_DAT_KEY', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.TABLE_DAT_KEY).toBe(expected)
  })

  test.each([
    [true, { flags: 'KEY_WITH_SIS|TABLE_PAT_KEY' }],
    [false, { flags: 'TABLE_NO_KEY' }],
  ])('TableCreate.KEY_WITH_SIS', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.KEY_WITH_SIS).toBe(expected)
  })

  test.each([
    [default_tokenizer, { default_tokenizer }],
    [undefined, {}],
  ])('TableCreate.default_tokenizer', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.default_tokenizer).toBe(expected)
  })

  test.each([
    [normalizer, { normalizer }],
    [undefined, {}],
  ])('TableCreate.normalizer', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.normalizer).toBe(expected)
  })

  test.each([
    [['TokenFilterStopWord', 'TokenFilterStem'], { token_filters: 'TokenFilterStopWord,TokenFilterStem' }],
    [['TokenFilterStopWord'], { token_filters: 'TokenFilterStopWord' }],
    [[], {}],
  ])('TableCreate.token_filters', (expected, args) => {
    const command = new TableCreate(args)
    expect(command.token_filters).toEqual(expected)
  })

  test('isTableCreate', () => {
    const command = createCommand('table_create', { name })
    expect(isTableCreate(command)).toBe(true)
    if (isTableCreate(command)) {
      expect(command).toBeInstanceOf(TableCreate)
      expect(command.name).toBe(name)
    }
  })
})
