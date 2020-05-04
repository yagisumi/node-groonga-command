import { Normalize, isNormalize } from '@/command/normalize'
import { createCommand } from '@/command/groonga_command'

describe('normalize', () => {
  const normalizer = 'NormalizerAuto'
  const string = 'AbcDef'
  const flags = 'REMOVE_BLANK'

  test('Normalize.command_name', () => {
    const command = new Normalize({})
    expect(command.command_name).toBe('normalize')
  })

  test('new Normalize({}, ordered_arguments)', () => {
    const command = new Normalize({}, [
      normalizer, //
      string,
      flags,
    ])

    expect(command.arguments).toEqual({
      normalizer,
      string,
      flags,
    })
  })

  test('Normalize.normalizer', () => {
    const command = new Normalize({ normalizer })
    expect(command.normalizer).toBe(normalizer)
  })

  test('Normalize.string', () => {
    const command = new Normalize({ string })
    expect(command.string).toBe(string)
  })

  test.each([
    [[], {}],
    [['REMOVE_BLANK', 'WITH_TYPES'], { flags: 'REMOVE_BLANK|WITH_TYPES' }],
    [['REMOVE_BLANK', 'WITH_TYPES'], { flags: 'REMOVE_BLANK WITH_TYPES' }],
    [['REMOVE_BLANK', 'WITH_TYPES'], { flags: 'REMOVE_BLANK | WITH_TYPES' }],
  ])('Normalize.flags', (expected, args) => {
    const command = new Normalize(args)
    expect(command.flags).toEqual(expected)
  })

  test('isNormalize', () => {
    const command = createCommand('normalize', { string })
    expect(isNormalize(command)).toBe(true)
    if (isNormalize(command)) {
      expect(command).toBeInstanceOf(Normalize)
      expect(command.string).toBe(string)
    }
  })
})
