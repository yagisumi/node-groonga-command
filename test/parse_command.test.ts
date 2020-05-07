import { parseCommand } from '@/parse_command'
import { TypeGuards } from '@/type_guards'

describe('parseCommand', () => {
  test.each([
    [
      'table_create',
      {
        name: 'Paths',
        flags: 'TABLE_HASH_KEY|KEY_LARGE',
        key_type: 'ShortText',
      },
      'table_create Paths TABLE_HASH_KEY|KEY_LARGE ShortText',
      undefined,
    ],
    [
      'table_create',
      {
        name: 'Paths',
        flags: 'TABLE_HASH_KEY|KEY_LARGE',
        key_type: 'ShortText',
      },
      'table_create \\\nPaths \\\nTABLE_HASH_KEY|KEY_LARGE \\\nShortText',
      undefined,
    ],
    [
      'table_create',
      {
        name: 'Lexicon',
        flags: 'TABLE_PAT_KEY',
        key_type: 'ShortText',
        default_tokenizer: 'TokenBigram',
        normalizer: 'NormalizerAuto',
      },
      'table_create Lexicon TABLE_PAT_KEY ShortText --default_tokenizer TokenBigram --normalizer NormalizerAuto',
      undefined,
    ],
    [
      'table_create',
      {
        name: 'TEST',
        flags: 'TABLE_PAT_KEY',
        key_type: 'ShortText',
        default_tokenizer: 'TokenBigram',
        normalizer: 'NormalizerAuto',
      },
      'table_create Lexicon TABLE_PAT_KEY ShortText --default_tokenizer TokenBigram --normalizer NormalizerAuto',
      {
        name: 'TEST',
      },
    ],
  ])(
    'command line',
    (
      expected_command_name,
      expected_arguments,
      command_line,
      options: { [name: string]: number | string } | undefined
    ) => {
      const command = parseCommand(command_line, options)
      expect(command).not.toBeUndefined()
      expect(command?.command_name).toBe(expected_command_name)
      expect(command?.arguments).toEqual(expected_arguments)
      if (command) {
        expect(TypeGuards.isTableCreate(command)).toBe(true)
        if (TypeGuards.isTableCreate(command)) {
          expect(command.key_type).toBe(expected_arguments.key_type)
        }
      }
    }
  )

  test.each([
    [
      'select',
      {
        table: 'Users',
      },
      '/d',
      '/d/select?table=Users&key_only',
      undefined,
    ],
    [
      'select',
      {
        table: 'Users',
        'drilldown[name].keys': 'name',
      },
      '/d',
      '/d/select?table=Users&drilldown[name].keys=name',
      undefined,
    ],
    [
      'select',
      {
        table: 'Users',
        'drilldown[name].keys': 'name',
      },
      '/d',
      '/d/select?table=Users&drilldown%5Bname%5D.keys=name',
      undefined,
    ],
    [
      'select',
      {
        table: 'Users',
      },
      '/db1',
      '/db1/select?table=Users',
      undefined,
    ],
    [
      'select',
      {
        table: 'Users',
      },
      '/groonga/db1',
      '/groonga/db1/select?table=Users',
      undefined,
    ],
    [
      'select',
      {
        table: 'TEST',
      },
      '/d',
      '/d/select?table=Users&key_only',
      {
        table: 'TEST',
      },
    ],
    [
      'select',
      {
        table: 'Users',
        filter: 'age<=30',
        output_type: 'json',
      },
      '/d',
      '/d/select.json?filter=age%3C%3D30&table=Users',
      undefined,
    ],
  ])(
    'uri path',
    (
      expected_command_name,
      expected_arguments,
      expected_path_prefix,
      command_line,
      options: { [name: string]: number | string } | undefined
    ) => {
      const command = parseCommand(command_line, options)
      expect(command).not.toBeUndefined()
      if (command) {
        expect(command.command_name).toBe(expected_command_name)
        expect(command.arguments).toEqual(expected_arguments)
        expect(command.path_prefix).toBe(expected_path_prefix)
        expect(TypeGuards.isSelect(command)).toBe(true)
        if (TypeGuards.isSelect(command)) {
          expect(command.table).toBe(expected_arguments.table)
        }
      }
    }
  )

  test('uri path without command name', () => {
    const command = parseCommand('/')
    expect(command).toBeUndefined()
  })
})
