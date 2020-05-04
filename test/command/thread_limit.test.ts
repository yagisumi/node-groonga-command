import { ThreadLimit, isThreadLimit } from '@/command/thread_limit'
import { createCommand } from '@/command/groonga_command'

describe('thread_limit', () => {
  const max = '1'

  test('ThreadLimit.command_name', () => {
    const command = new ThreadLimit({})
    expect(command.command_name).toBe('thread_limit')
  })

  test('new ThreadLimit({}, ordered_arguments)', () => {
    const command = new ThreadLimit({}, [
      max, //
    ])

    expect(command.arguments).toEqual({
      max,
    })
  })

  test('ThreadLimit.max', () => {
    const command = new ThreadLimit({ max })
    expect(command.max).toBe(parseInt(max))
  })

  test('isThreadLimit', () => {
    const command = createCommand('thread_limit', { max })
    expect(isThreadLimit(command)).toBe(true)
    if (isThreadLimit(command)) {
      expect(command).toBeInstanceOf(ThreadLimit)
      expect(command.max).toBe(parseInt(max))
    }
  })
})
