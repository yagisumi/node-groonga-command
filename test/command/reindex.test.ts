import { Reindex, isReindex } from '@/command/reindex'
import { createCommand } from '@/command/groonga_command'

describe('reindex', () => {
  const target_name = 'Lexicon.index'

  test('Reindex.command_name', () => {
    const command = new Reindex({})
    expect(command.command_name).toBe('reindex')
  })

  test('new Reindex({}, ordered_arguments)', () => {
    const command = new Reindex({}, [
      target_name, //
    ])

    expect(command.arguments).toEqual({
      target_name,
    })
  })

  test('Reindex.target_name', () => {
    const command = new Reindex({ target_name })
    expect(command.target_name).toBe(target_name)
  })

  test('isReindex', () => {
    const command = createCommand('reindex', { target_name })
    expect(isReindex(command)).toBe(true)
    if (isReindex(command)) {
      expect(command).toBeInstanceOf(Reindex)
      expect(command.target_name).toBe(target_name)
    }
  })
})
