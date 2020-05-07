import { GroongaCommand, TypeGuards } from '@/groonga-command'

describe('GroongaCommand', () => {
  test('GroongaCommand', () => {
    const command = new GroongaCommand('select', { table: 'Users' })
    expect(command.command_name).toBe('select')
    expect(TypeGuards.isSelect(command)).toBe(true)
    if (TypeGuards.isSelect(command)) {
      expect(command.table).toBe('Users')
    }
  })
})
