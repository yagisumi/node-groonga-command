import { ObjectExist, isObjectExist } from '@/command/object_exist'
import { createCommand } from '@/command/groonga_command'

describe('object_exist', () => {
  const name = 'Users'

  test('ObjectExist.command_name', () => {
    const command = new ObjectExist({})
    expect(command.command_name).toBe('object_exist')
  })

  test('new ObjectExist({}, ordered_arguments)', () => {
    const command = new ObjectExist({}, [
      name, //
    ])

    expect(command.arguments).toEqual({
      name,
    })
  })

  test('ObjectExist.name', () => {
    const command = new ObjectExist({ name })
    expect(command.name).toBe(name)
  })

  test('isObjectExist', () => {
    const command = createCommand('object_exist', { name })
    expect(isObjectExist(command)).toBe(true)
    if (isObjectExist(command)) {
      expect(command).toBeInstanceOf(ObjectExist)
      expect(command.name).toBe(name)
    }
  })
})
