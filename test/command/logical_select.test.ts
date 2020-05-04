import { LogicalSelect, isLogicalSelect } from '@/command/logical_select'
import { createCommand } from '@/command/groonga_command'

describe('logical_select', () => {
  test('LogicalSelect.command_name', () => {
    const command = new LogicalSelect({})
    expect(command.command_name).toBe('logical_select')
  })

  test('new LogicalSelect({}, ordered_arguments)', () => {
    const command = new LogicalSelect({}, [])

    expect(command.arguments).toEqual({})
  })

  test('isLogicalSelect', () => {
    const command = createCommand('logical_select', {})
    expect(isLogicalSelect(command)).toBe(true)
    if (isLogicalSelect(command)) {
      expect(command).toBeInstanceOf(LogicalSelect)
      // expect(command.to_name).toBe(to_name)
    }
  })
})
