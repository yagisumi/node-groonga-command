import { ObjectInspect, isObjectInspect } from '@/command/object_inspect'
import { createCommand } from '@/command/groonga_command'

describe('object_inspect', () => {
  const name = 'Users'

  test('ObjectInspect.command_name', () => {
    const command = new ObjectInspect({})
    expect(command.command_name).toBe('object_inspect')
  })

  test('new ObjectInspect({}, ordered_arguments)', () => {
    const command = new ObjectInspect({}, [
      name, //
    ])

    expect(command.arguments).toEqual({
      name,
    })
  })

  test('ObjectInspect.name', () => {
    const command = new ObjectInspect({ name })
    expect(command.name).toBe(name)
  })

  test('isObjectInspect', () => {
    const command = createCommand('object_inspect', { name })
    expect(isObjectInspect(command)).toBe(true)
    if (isObjectInspect(command)) {
      expect(command).toBeInstanceOf(ObjectInspect)
      expect(command.name).toBe(name)
    }
  })
})
