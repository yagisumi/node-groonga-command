import { createCommand, TypeGuards } from '@/groonga-command'

describe('GroongaCommand', () => {
  test('GroongaCommand', () => {
    const command = createCommand('select', { table: 'Users' })
    expect(command.command_name).toBe('select')
    expect(TypeGuards.isSelect(command)).toBe(true)
    if (TypeGuards.isSelect(command)) {
      expect(command.table).toBe('Users')
    }
  })
})
