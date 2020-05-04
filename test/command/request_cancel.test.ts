import { RequestCancel, isRequestCancel } from '@/command/request_cancel'
import { createCommand } from '@/command/groonga_command'

describe('request_cancel', () => {
  const id = 'ID'

  test('RequestCancel.command_name', () => {
    const command = new RequestCancel({})
    expect(command.command_name).toBe('request_cancel')
  })

  test('new RequestCancel({}, ordered_arguments)', () => {
    const command = new RequestCancel({}, [
      id, //
    ])

    expect(command.arguments).toEqual({
      id,
    })
  })

  test('RequestCancel.id', () => {
    const command = new RequestCancel({ id })
    expect(command.id).toBe(id)
  })

  test('isRequestCancel', () => {
    const command = createCommand('request_cancel', { id })
    expect(isRequestCancel(command)).toBe(true)
    if (isRequestCancel(command)) {
      expect(command).toBeInstanceOf(RequestCancel)
      expect(command.id).toBe(id)
    }
  })
})
