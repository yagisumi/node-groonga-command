import { TableTokenize, isTableTokenize } from '@/command/table_tokenize'
import { createCommand } from '@/command/groonga_command'

describe('table_tokenize', () => {
  const table = 'Lexicon'
  const string = 'groonga ruby linux'
  const flags = 'NONE'
  const mode = 'ADD'

  test('TableTokenize.command_name', () => {
    const command = new TableTokenize({})
    expect(command.command_name).toBe('table_tokenize')
  })

  test('new TableTokenize({}, ordered_arguments)', () => {
    const command = new TableTokenize({}, [
      table, //
      string,
      flags,
      mode,
    ])

    expect(command.arguments).toEqual({
      table,
      string,
      flags,
      mode,
    })
  })

  test('TableTokenize.table', () => {
    const command = new TableTokenize({ table })
    expect(command.table).toBe(table)
  })

  test('TableTokenize.string', () => {
    const command = new TableTokenize({ string })
    expect(command.string).toBe(string)
  })

  test.each([
    [[], {}],
    [['NONE', 'ENABLE_TOKENIZED_DELIMITER'], { flags: 'NONE|ENABLE_TOKENIZED_DELIMITER' }],
    [['NONE', 'ENABLE_TOKENIZED_DELIMITER'], { flags: 'NONE ENABLE_TOKENIZED_DELIMITER' }],
    [['NONE', 'ENABLE_TOKENIZED_DELIMITER'], { flags: 'NONE | ENABLE_TOKENIZED_DELIMITER' }],
  ])('TableTokenize.flags', (expected, args) => {
    const command = new TableTokenize(args)
    expect(command.flags).toEqual(expected)
  })

  test('TableTokenize.mode', () => {
    const command = new TableTokenize({ mode })
    expect(command.mode).toBe(mode)
  })

  test('isTableTokenize', () => {
    const command = createCommand('table_tokenize', { mode })
    expect(isTableTokenize(command)).toBe(true)
    if (isTableTokenize(command)) {
      expect(command).toBeInstanceOf(TableTokenize)
      expect(command.mode).toBe(mode)
    }
  })
})
