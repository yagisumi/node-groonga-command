import { Tokenize, isTokenize } from '@/command/tokenize'
import { createCommand } from '@/command/groonga_command'

describe('tokenize', () => {
  const tokenizer = 'TokenDelimit'
  const string = 'groonga ruby linux'
  const normalizer = 'NormalizerAuto'
  const flags = 'NONE'
  const mode = 'ADD'
  const token_filters = 'TokenFilterStem'

  test('Tokenize.command_name', () => {
    const command = new Tokenize({})
    expect(command.command_name).toBe('tokenize')
  })

  test('new Tokenize({}, ordered_arguments)', () => {
    const command = new Tokenize({}, [
      tokenizer, //
      string,
      normalizer,
      flags,
      mode,
      token_filters,
    ])

    expect(command.arguments).toEqual({
      tokenizer,
      string,
      normalizer,
      flags,
      mode,
      token_filters,
    })
  })

  test('Tokenize.tokenizer', () => {
    const command = new Tokenize({ tokenizer })
    expect(command.tokenizer).toBe(tokenizer)
  })

  test('Tokenize.normalizer', () => {
    const command = new Tokenize({ normalizer })
    expect(command.normalizer).toBe(normalizer)
  })

  test('Tokenize.string', () => {
    const command = new Tokenize({ string })
    expect(command.string).toBe(string)
  })

  test.each([
    [[], {}],
    [[], { flags: '' }],
    [['NONE', 'ENABLE_TOKENIZED_DELIMITER'], { flags: 'NONE|ENABLE_TOKENIZED_DELIMITER' }],
    [['NONE', 'ENABLE_TOKENIZED_DELIMITER'], { flags: 'NONE ENABLE_TOKENIZED_DELIMITER' }],
    [['NONE', 'ENABLE_TOKENIZED_DELIMITER'], { flags: 'NONE | ENABLE_TOKENIZED_DELIMITER' }],
  ])('Tokenize.flags', (expected, args) => {
    const command = new Tokenize(args)
    expect(command.flags).toEqual(expected)
  })

  test('Tokenize.mode', () => {
    const command = new Tokenize({ mode })
    expect(command.mode).toBe(mode)
  })

  test.each([
    [[], {}],
    [[], { token_filters: '' }],
    [['TokenFilterStem', 'TokenFilterStopWord'], { token_filters: 'TokenFilterStem,TokenFilterStopWord' }],
    [['TokenFilterStem', 'TokenFilterStopWord'], { token_filters: 'TokenFilterStem , TokenFilterStopWord' }],
  ])('Tokenize.token_filters', (expected, args) => {
    const command = new Tokenize(args)
    expect(command.token_filters).toEqual(expected)
  })

  test('isTokenize', () => {
    const command = createCommand('tokenize', { mode })
    expect(isTokenize(command)).toBe(true)
    if (isTokenize(command)) {
      expect(command).toBeInstanceOf(Tokenize)
      expect(command.mode).toBe(mode)
    }
  })
})
