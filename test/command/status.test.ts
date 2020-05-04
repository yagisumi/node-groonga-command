import { Status, isStatus } from '@/command/status'
import { createCommand } from '@/command/groonga_command'

describe('status', () => {
  test('Status.command_name', () => {
    const command = new Status({})
    expect(command.command_name).toBe('status')
  })

  test('new Status({}, ordered_arguments)', () => {
    const command = new Status({}, [])

    expect(command.arguments).toEqual({})
  })

  test('isStatus', () => {
    const command = createCommand('status', {})
    expect(isStatus(command)).toBe(true)
    if (isStatus(command)) {
      expect(command).toBeInstanceOf(Status)
    }
  })
})
