import { Schema, isSchema } from '@/command/schema'
import { createCommand } from '@/command/groonga_command'

describe('schema', () => {
  test('Schema.command_name', () => {
    const command = new Schema({})
    expect(command.command_name).toBe('schema')
  })

  test('new Schema({}, ordered_arguments)', () => {
    const command = new Schema({}, [])

    expect(command.arguments).toEqual({})
  })

  test('isSchema', () => {
    const command = createCommand('schema', {})
    expect(isSchema(command)).toBe(true)
    if (isSchema(command)) {
      expect(command).toBeInstanceOf(Schema)
    }
  })
})
