import { createCommand } from '@/command/groonga_command'
import { FormatOptions } from '@/types'

describe('GroongaCommand', () => {
  test.each([
    [
      '/d/select.json?filter=age%3C%3D30&table=Users',
      'select',
      {
        table: 'Users',
        filter: 'age<=30',
        output_type: 'json',
      },
      undefined,
      undefined,
    ],
    [
      // incompatible
      '/d/select.json?filter=geo_in_rectangle(location%2C%2235.73360x' +
        '139.7394%22%2C%2262614x139.7714%22)%20%26%26%20((type%20%3D%3D' +
        '%20%22%E3%81%9F%E3%81%84%E3%82%84%E3%81%8D%22%20%7C%7C%20type%' +
        '20%3D%3D%20%22%E5%92%8C%E8%8F%93%E5%AD%90%22))%20%26%26%20keyw' +
        'ord%20%40%20%22%E3%81%9F%E3%81%84%E3%82%84%E3%81%8D%22%20%26!%' +
        '20keyword%20%40%20%22%E7%99%BD%22%20%26!%20keyword%20%40%20%22' +
        '%E9%A4%8A%E6%AE%96%22&table=Users',
      'select',
      {
        table: 'Users',
        filter:
          'geo_in_rectangle(location,' +
          '"35.73360x139.7394","62614x139.7714") && ' +
          '((type == "たいやき" || type == "和菓子")) && ' +
          'keyword @ "たいやき" &! keyword @ "白" &! keyword @ "養殖"',
        output_type: 'json',
      },
      undefined,
      undefined,
    ],
    [
      '/d/select.json?table=Users',
      'select',
      {
        table: 'Users',
        output_type: 'json',
      },
      undefined,
      undefined,
    ],
    [
      '/db1/select.json?table=Users',
      'select',
      {
        table: 'Users',
        output_type: 'json',
      },
      '/db1',
      undefined,
    ],
    [
      // incompatible
      '/d/load?table=Entries',
      'load',
      {
        table: 'Entries',
        values: '[{"_key":"Groonga","content":"It\'s very fast!!"}]',
      },
      undefined,
      {
        exclude: ['values'],
      },
    ],
  ])(
    'GroongaCommand.to_uri_format()',
    (expected, cmd, args, prefix: string | undefined, options: FormatOptions | undefined) => {
      const command = createCommand(cmd, args)
      if (prefix) {
        command.path_prefix = prefix
      }
      expect(command.to_uri_format(options)).toBe(expected)
    }
  )

  test.each([
    [
      'select --filter "age<=30" --output_type "json" --table "Users"',
      'select',
      {
        table: 'Users',
        filter: 'age<=30',
        output_type: 'json',
      },
      undefined,
    ],
    [
      'select --filter "geo_in_rectangle(location,' +
        '\\"35.73360x139.7394\\",\\"62614x139.7714\\") && ' +
        '((type == \\"たいやき\\" || type == \\"和菓子\\")) && ' +
        'keyword @ \\"たいやき\\" &! keyword @ \\"白\\" &! ' +
        'keyword @ \\"養殖\\"" --output_type "json" --table "Users"',
      'select',
      {
        table: 'Users',
        filter:
          'geo_in_rectangle(location,' +
          '"35.73360x139.7394","62614x139.7714") && ' +
          '((type == "たいやき" || type == "和菓子")) && ' +
          'keyword @ "たいやき" &! keyword @ "白" &! keyword @ "養殖"',
        output_type: 'json',
      },
      undefined,
    ],
    [
      'select --output_type "json" --table "Users"',
      'select',
      {
        table: 'Users',
        output_type: 'json',
      },
      undefined,
    ],
    [
      'select \\\n' + '  --filter "_key == 29" \\\n' + '  --output_type "json" \\\n' + '  --table "Users"',
      'select',
      {
        table: 'Users',
        filter: '_key == 29',
        output_type: 'json',
      },
      {
        pretty_print: true,
      },
    ],
    [
      // incompatible
      'load --table "Entries"',
      'load',
      {
        table: 'Entries',
        values: '[{"_key":"Groonga","content":"It\'s very fast!!"}]',
      },
      {
        exclude: ['values'],
      },
    ],
  ])('GroongaCommand.to_command_format', (expected, cmd, args, options: FormatOptions | undefined) => {
    const command = createCommand(cmd, args)
    expect(command.to_command_format(options)).toBe(expected)
  })

  test('GroongaCommand.toString()', () => {
    const select1 = createCommand('select', { table: 'Users' })
    select1.original_format = 'uri'
    expect(select1.toString()).toBe(select1.to_uri_format())

    const select2 = createCommand('select', { table: 'Users' })
    select2.original_format = 'command'
    expect(select2.toString()).toBe(select2.to_command_format())

    const select3 = createCommand('select', { table: 'Users' })
    expect(select3.toString()).toBe(select3.to_command_format())
  })
})
