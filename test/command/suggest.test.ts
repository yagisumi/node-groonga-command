import { Suggest, isSuggest } from '@/command/suggest'
import { createCommand } from '@/command/groonga_command'

describe('suggest', () => {
  const types = 'complete'
  const table = 'Users'
  const column = 'name'
  const query = 'name:@ Ali'
  const sortby = '_score'
  const output_columns = 'name'
  const offset = '0'
  const limit = '5'
  const frequency_threshold = '120'
  const conditional_probability_threshold = '0.3'
  const prefix_search = 'yes'
  const similar_search = 'yes'

  test('Suggest.command_name', () => {
    const command = new Suggest({})
    expect(command.command_name).toBe('suggest')
  })

  test('new Suggest({}, ordered_arguments)', () => {
    const command = new Suggest({}, [
      types, //
      table,
      column,
      query,
      sortby,
      output_columns,
      offset,
      limit,
      frequency_threshold,
      conditional_probability_threshold,
      prefix_search,
      similar_search,
    ])

    expect(command.arguments).toEqual({
      types,
      table,
      column,
      query,
      sortby,
      output_columns,
      offset,
      limit,
      frequency_threshold,
      conditional_probability_threshold,
      prefix_search,
      similar_search,
    })
  })

  test('isSuggest', () => {
    const command = createCommand('suggest', {})
    expect(isSuggest(command)).toBe(true)
    if (isSuggest(command)) {
      expect(command).toBeInstanceOf(Suggest)
    }
  })
})
