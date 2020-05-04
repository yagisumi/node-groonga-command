import { Dump, isDump } from '@/command/dump'
import { createCommand } from '@/command/groonga_command'

describe('dump', () => {
  const tables = 'Users, Logs'
  const dump_plugins = 'no'
  const dump_schema = 'yes'
  const dump_records = 'no'
  const dump_indexes = 'yes'
  const dump_configs = 'no'
  const sort_hash_table = 'yes'

  test('Dump.command_name', () => {
    const command = new Dump({})
    expect(command.command_name).toBe('dump')
  })

  test('new Dump({}, ordered_arguments)', () => {
    const command = new Dump({}, [
      tables, //
      dump_plugins,
      dump_schema,
      dump_records,
      dump_indexes,
      dump_configs,
      sort_hash_table,
    ])

    expect(command.arguments).toEqual({
      tables,
      dump_plugins,
      dump_schema,
      dump_records,
      dump_indexes,
      dump_configs,
      sort_hash_table,
    })
  })

  test('Dump.output_type', () => {
    const command = new Dump({})
    expect(command.output_type).toBe('none')
  })

  test.each([
    [false, {}],
    [true, { sort_hash_table }],
  ])('Dump.is_sort_hash_table()', (expected, args) => {
    const command = new Dump(args)
    expect(command.is_sort_hash_table()).toBe(expected)
  })

  test('isDump', () => {
    const command = createCommand('dump', {})
    expect(isDump(command)).toBe(true)
    if (isDump(command)) {
      expect(command).toBeInstanceOf(Dump)
      expect(command.is_sort_hash_table()).toBe(false)
    }
  })
})
