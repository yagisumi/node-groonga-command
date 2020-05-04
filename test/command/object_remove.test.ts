import { ObjectRemove, isObjectRemove } from '@/command/object_remove'
import { createCommand } from '@/command/groonga_command'

describe('object_remove', () => {
  const name = 'Users'
  const force = 'yes'

  test('ObjectRemove.command_name', () => {
    const command = new ObjectRemove({})
    expect(command.command_name).toBe('object_remove')
  })

  test('new ObjectRemove({}, ordered_arguments)', () => {
    const command = new ObjectRemove({}, [
      name, //
      force,
    ])

    expect(command.arguments).toEqual({
      name,
      force,
    })
  })

  test('ObjectRemove.name', () => {
    const command = new ObjectRemove({ name })
    expect(command.name).toBe(name)
  })

  test('ObjectRemove.force', () => {
    const command = new ObjectRemove({ force })
    expect(command.is_force()).toBe(true)
  })

  test('isObjectRemove', () => {
    const command = createCommand('object_remove', { name })
    expect(isObjectRemove(command)).toBe(true)
    if (isObjectRemove(command)) {
      expect(command).toBeInstanceOf(ObjectRemove)
      expect(command.name).toBe(name)
    }
  })
})
